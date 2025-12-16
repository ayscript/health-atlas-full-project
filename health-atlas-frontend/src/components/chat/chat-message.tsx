"use client"

import { Copy, Check, Volume2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Client } from "@gradio/client"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = async () => {
    // Prevent multiple requests at once
    if (isSpeaking) return

    setIsSpeaking(true)

    try {
      // 1. Connect to your specific Space
      const client = await Client.connect("ayscript/text-to-speech")

      // 2. Send the message content to the API
      const result = await client.predict("/synthesize_speech", {
        text: message.content,
        language: "yoruba", // Hardcoded based on your snippet
      })

      // 3. Handle the Audio Result
      // Gradio usually returns an array. Index 0 is often the audio info.
      const responseData = (result.data as any[])[0] as any
      
      // Check if we got a direct URL or an object with a 'url' property
      const audioUrl = typeof responseData === "string" 
        ? responseData 
        : responseData?.url

      if (audioUrl) {
        const audio = new Audio(audioUrl)
        
        // Handle cleanup when audio finishes or fails
        audio.onended = () => setIsSpeaking(false)
        audio.onerror = () => {
          console.error("Error playing audio")
          setIsSpeaking(false)
        }
        
        await audio.play()
      } else {
        console.error("No valid audio URL found in response:", result.data)
        setIsSpeaking(false)
      }

    } catch (error) {
      console.error("Text-to-speech error:", error)
      setIsSpeaking(false)
    }
  }

  if (message.role === "user") {
    return (
      <div className="flex justify-end animate-slide-in">
        <div className="max-w-xs md:max-w-md lg:max-w-2xl">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start animate-slide-in">
      <div className="max-w-xs md:max-w-md lg:max-w-2xl">
        <div className="bg-card border border-secondary/30 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-secondary/50">
          <p className="text-sm md:text-base leading-relaxed text-foreground">{message.content}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <div className="flex gap-1">
            {/* COPY BUTTON */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-secondary/10 hover:text-secondary transition-colors duration-200"
              onClick={handleCopy}
              title="Copy"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>

            {/* SPEAK BUTTON (New Integration) */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-secondary/10 hover:text-secondary transition-colors duration-200"
              onClick={handleSpeak}
              disabled={isSpeaking}
              title="Speak"
            >
              {isSpeaking ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}