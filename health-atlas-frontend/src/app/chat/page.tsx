"use client";
import { useAuth } from "@/store/auth";
import { MessageSquare } from "lucide-react";
import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./layout";
import ChatMessage from "@/components/chat/chat-message";
import TypingIndicator from "@/components/chat/typing-indicator";

const INITIAL_SUGGESTIONS = [
  "What are common symptoms of malaria?",
  "How do I recognize a fever?",
  "What should I do for a headache?",
  "Guide me through basic first aid",
];

const Page = () => {
  const context = useContext(ChatContext);
  const messages = context?.messages || [];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);
  const userData = useAuth();

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
      {/* If there are messages or the chat is loading, show the message list */}
      {(messages.length > 0 || context?.isLoading) ? (
        <div className="overflow-auto p-4 flex-1">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message as any} />
          ))}
          {context?.isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        // Otherwise show the empty-state / suggestion UI
        <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-float">
            <div className="w-20 h-20 bg-linear-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="w-16 h-16 bg-linear-to-br from-secondary/30 to-primary/30 rounded-full flex items-center justify-center">
                <MessageSquare className="w-7 h-7" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Hi {userData.user?.display_name || "user"}, how can I help you?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md text-sm md:text-base">
            Ask me anything about health symptoms, first aid, or wellness. I'm
            here to provide guidance in your language.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
            {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  context?.setInput(suggestion);
                  context?.focusInput();
                }}
                className="p-3 rounded-lg border border-secondary/30 bg-card transition-all duration-200 text-left text-sm text-foreground/80 hover:border-secondary/70 hover:text-gray-700 hover:shadow-md group cursor-pointer"
              >
                <p className="font-medium group-hover:text-gray-800 transition-colors">
                  {suggestion}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
