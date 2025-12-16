"use client";

import { useState, useRef, useEffect, ReactNode, createContext } from "react";
import { Button } from "@/components/ui/button";
import { Info, Menu } from "lucide-react";
import ChatInput from "@/components/chat/chat-input";
import ChatSidebar from "@/components/chat/chat-sidebar";
import useAuthRedirect from "@/hooks/use-auth-redirect";

interface Message {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const ChatContext = createContext<{
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Message[];
  setCurrentConversationId: (id: string) => void;
  setMessages: (messages: Message[]) => void;
  setInput: (value: string) => void;
  focusInput: () => void;
  isLoading: boolean;
} | null>(null);

export default function ChatbotPage({ children }: { children: ReactNode }) {
  const { checked, loading, user } = useAuthRedirect();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);

  if (loading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Redirecting to login...
        </div>
      </div>
    );
  }

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );
  const isEmptyChat = messages.filter((m) => m.role !== "system").length === 0;

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newId);
    setMessages([]);
  };

  const handleCreateConversation = (template: { title: string; messages: Message[] }) => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: template.title,
      messages: template.messages,
      createdAt: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newId);
    setMessages(template.messages);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    const conversation = conversations.find((c) => c.id === id);
    setMessages(conversation?.messages || []);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => inputRef.current?.focus(), 0);
  };



  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 1. Update UI immediately with User message
    const newHistory = [
      ...messages,
      {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      },
    ];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Add a placeholder for the Assistant's reply
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }), // Send FULL history
      });

      if (!res.body) {
        throw new Error("Response body is null");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      // 3. Stream the response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Update the last message (Assistant) with new text
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            id: updated[updated.length - 1].id,
            role: "assistant",
            content: accumulatedText,
            timestamp: updated[updated.length - 1].timestamp,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        messages,
        setCurrentConversationId,
        setMessages,
        setInput,
        focusInput: () => setTimeout(() => inputRef.current?.focus(), 0),
        isLoading,
      }}
    >
      <div className="h-svh overflow-hidden bg-linear-to-b from-white/50 via-sky-50 to-blue-50 flex flex-col">
        <div className="flex flex-1 relative overflow-hidden">
          <ChatSidebar
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            onNewChat={handleNewChat}
            onCreateConversation={handleCreateConversation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="flex-1 flex flex-col relative z-10">
            {/* Header */}
            <div className="border-b border-border/50 sm:hidden px-4 md:px-6 py-4 flex items-center justify-between bg-linear-to-r from-card/50 to-secondary/10 backdrop-blur-md rounded-b-xl">
              <Button
                variant={"outline"}
                onClick={() => {
                  setSidebarOpen((prev) => !prev);
                }}
              >
                <Menu />
              </Button>
            </div>

            {children}

            {/* Input Area */}
            <div className="border-t border-border/50 bg-linear-to-t from-card/80 to-background/50 px-4 md:px-6 py-4 backdrop-blur-md rounded-t-xl">
              {/* <VoiceRecorder /> */}
              <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-warning/5 border border-warning/30">
                <Info className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-xs text-warning">
                  HealthAtlas Assistant can make mistakes. Always consult a
                  qualified healthcare professional for serious concerns.
                </p>
              </div>
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={handleSendMessage}
                loading={isLoading}
                inputRef={inputRef}
              />
            </div>
          </div>
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export { ChatContext };
