'use client'

import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../layout";
import ChatMessage from "@/components/chat/chat-message";
import TypingIndicator from "@/components/chat/typing-indicator";

const Page = () => {
  const context = useContext(ChatContext);
  const messages = context?.messages || [];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);
  return (
    <div className="overflow-auto p-4 flex-1">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message as any} />
      ))}
      {context?.isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Page;
