"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mic,
  Square,
  Plus,
  AudioLines,
  SendHorizonal,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input";
import VoiceRecorder from "../voice-recorder";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string) => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  loading,
  inputRef,
}: ChatInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  useEffect(() => {
    // Auto-resize logic removed as Input component does not support textarea-style resizing
  }, [value, inputRef]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstart = () => {
        setIsRecording(true);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        await sendAudioToAPI(audioBlob);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsListening(false);
    }
  };

  const sendAudioToAPI = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.text) {
        onChange(data.text);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <div className="flex gap-3 items-end">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center w-full bg-gray-200 text-black rounded-full px-4 py-3 gap-3">
          {/* Input */}
          <Input
            placeholder="Ask about symptoms, first aid, or health guidance..."
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          />

          {/* Mic Button */}
          <VoiceRecorder />
          {/* <Button
            variant="outline"
            size="icon"
            // className=""
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className={`transition-all duration-200 text-gray-700 rounded-full ${
              isRecording
                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-mic-pulse"
                : "text-gray-700 rounded-full"
            }`}
            title={isRecording ? "Stop recording" : "Start voice input"}
          >
            {isRecording ? (
              <Square className="w-4 h-4 fill-current" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button> */}

          {/* Waveform Button (White Circle) */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSubmit(value)}
            disabled={loading || !value.trim()}
            className="bg-white text-gray-700 rounded-full p-2 cursor-pointer disabled:"
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
