"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2, MessageSquare, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";

interface Conversation {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    role: string;
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
  onCreateConversation: (template: { title: string; messages: Conversation['messages'] }) => void;
}

export default function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  onCreateConversation,
  sidebarOpen,
  setSidebarOpen,
}: ChatSidebarProps) {
  const { logout } = useAuth();
  const router = useRouter()
  
  return (
    <div
      className={`w-64 border-r border-border bg-linear-to-b from-card/80 to-card ${
        sidebarOpen ? "flex" : "hidden"
      } sm:flex flex-col backdrop-blur-sm max-sm:fixed top-0 bottom-0 z-50`}
    >
      <div className="p-4 border-b border-border/50">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Health Atlas
          </span>
        </Link>
        {/* <Button
          onClick={onNewChat}
          variant="outline"
          className="w-full justify-start gap-2 text-foreground hover:bg-secondary/10 hover:text-secondary bg-transparent border-secondary/30 hover:border-secondary/50 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          New chat
        </Button> */}
      </div>

      <ScrollArea className="flex-1">
        {/* <div className="p-3 space-y-2"> */}
          {/* {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No conversations yet
            </p>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-center gap-2 p-3 rounded-lg group cursor-pointer transition-all duration-200 ${
                  currentConversationId === conv.id
                    ? "bg-secondary/10 text-secondary border border-secondary/30"
                    : "hover:bg-muted text-foreground border border-transparent"
                }`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-sm truncate">{conv.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))
          )} */}
        {/* </div> */}
        <div className="p-4 border-t border-border/50 space-y-2">
        {/* <div className="text-xs text-muted-foreground mb-2">Quick templates</div>
         */}
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-sm text-foreground/90"
          onClick={() => {
            const now = Date.now();
            onCreateConversation({
              title: "Fever assessment",
              messages: [
                { id: `${now}-1`, role: "user", content: "My child has a fever of 39°C for two days.", timestamp: new Date() },
                { id: `${now}-2`, role: "assistant", content: "Have they had difficulty breathing, seizures, or are they very sleepy?", timestamp: new Date() },
              ],
            });
          }}
        >
          Fever assessment
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-sm text-foreground/90"
          onClick={() => {
            const now = Date.now();
            onCreateConversation({
              title: "Headache guidance",
              messages: [
                { id: `${now}-1`, role: "user", content: "I've had a severe headache for 3 days.", timestamp: new Date() },
                { id: `${now}-2`, role: "assistant", content: "Do you have any vision changes, weakness, or vomiting?", timestamp: new Date() },
              ],
            });
          }}
        >
          Headache guidance
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-sm text-foreground/90"
          onClick={() => {
            const now = Date.now();
            onCreateConversation({
              title: "First aid for heavy bleeding",
              messages: [
                { id: `${now}-1`, role: "user", content: "Someone is bleeding heavily from a leg wound.", timestamp: new Date() },
                { id: `${now}-2`, role: "assistant", content: "Apply direct pressure, raise the limb if possible, and seek emergency care if bleeding doesn't stop.", timestamp: new Date() },
              ],
            });
          }}
        >
          First aid for heavy bleeding
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-sm text-foreground/90"
          onClick={() => {
            const now = Date.now();
            onCreateConversation({
              title: "Fever in adults",
              messages: [
                { id: `${now}-1`, role: "user", content: "I have a fever and body aches.", timestamp: new Date() },
                { id: `${now}-2`, role: "assistant", content: "Do you have difficulty breathing, chest pain, or confusion?", timestamp: new Date() },
              ],
            });
          }}
        >
          Fever in adults
        </Button>
      </div>
      </ScrollArea>

      <Button
        variant={"outline"}
        onClick={() => {
          logout()
          router.push('/')
        }}
        className="m-4 text-red-700 border-red-700 hover:text-red-700 hover:bg-red-300/50"
      >
        Logout
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          setSidebarOpen(false);
        }}
        className="fixed top-2 -right-[50%] mr-2 sm:hidden"
      >
        <X />
      </Button>
    </div>
  );
}
