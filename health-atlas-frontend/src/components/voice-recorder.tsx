"use client";

import { useState, useRef, useContext } from "react";
import { Client } from "@gradio/client";
import { ChatContext } from "@/app/chat/layout";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const chatContext = useContext(ChatContext);

  // Track the actual mime type used (e.g., 'audio/mp4' or 'audio/webm')
  const [mimeType, setMimeType] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // --- HELPER: Determine best supported format ---
  const getSupportedMimeType = () => {
    const types = [
      "audio/mp4", // Safari (creates .m4a/.mp4)
      "audio/webm;codecs=opus", // Chrome/Firefox (modern)
      "audio/webm", // Chrome/Firefox (fallback)
      "audio/ogg", // Older Firefox
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return ""; // Browser will use its default
  };

  // --- 1. START RECORDING ---
  const startRecording = async (): Promise<void> => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 1. Get the best format for this specific browser
      const selectedType = getSupportedMimeType();
      setMimeType(selectedType); // Save this for when we stop

      // 2. Pass the options to the MediaRecorder
      const options = selectedType ? { mimeType: selectedType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // 3. Create Blob using the SAME type we started with and transcribe immediately
        const blob = new Blob(audioChunksRef.current, { type: selectedType || "audio/wav" });
        stream.getTracks().forEach((track) => track.stop());
        // Automatically start transcription on stop
        void handleTranscribe(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTranscription("");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access denied or not available.");
    }
  };

  // --- 2. STOP RECORDING (No changes needed) ---
  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // --- 3. SEND TO AI (No changes needed) ---
  // If a blob is passed, use it. Otherwise the function is a no-op
  const handleTranscribe = async (blob?: Blob): Promise<void> => {
    if (!blob) return;
    setLoading(true);
    try {
      const client = await Client.connect("ayscript/NCAIR-Yoruba");
      const result: any = await client.predict("/transcribe", {
        audio: blob,
      });
      if (result.data && result.data.length > 0) {
        const text = result.data[0] as string;
        setTranscription(text);
        chatContext?.setInput?.(text);
        chatContext?.focusInput?.();
      }
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscription("Error: Could not transcribe.");
    } finally {
      setLoading(false);
    }
  };

  // Render only the audio button (icon). While transcribing, show spinner activity.
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={loading}
        className={`transition-all duration-200 text-gray-700 rounded-full ${
          isRecording
            ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-mic-pulse"
            : "text-gray-700 rounded-full"
        }`}
        title={loading ? "Transcribing..." : isRecording ? "Stop recording" : "Start voice input"}
      >
        {loading ? (
          <Spinner className="w-4 h-4" />
        ) : isRecording ? (
          <Square className="w-4 h-4 fill-current" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}