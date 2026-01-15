"use client";

import { MessageCircle, Users, Phone } from "lucide-react";

type FloatingActionBarProps = {
  onComments?: () => void;
  onGroupChat?: () => void;
  onCall?: () => void;
  commentsActive?: boolean;
  groupChatActive?: boolean;
  callActive?: boolean;
};

export default function FloatingActionBar({
  onComments,
  onGroupChat,
  onCall,
  commentsActive = false,
  groupChatActive = false,
  callActive = false,
}: FloatingActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-border bg-card/95 backdrop-blur-sm px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3">
        <button
          type="button"
          onClick={onComments}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold shadow-sm transition-colors ${
            commentsActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          <span>Comments</span>
        </button>
        <button
          type="button"
          onClick={onGroupChat}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold shadow-sm transition-colors ${
            groupChatActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Group Chat</span>
        </button>
        <button
          type="button"
          onClick={onCall}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors ${
            callActive
              ? "bg-primary/90 text-primary-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          <Phone className="h-4 w-4" />
          <span>Call</span>
        </button>
      </div>
    </div>
  );
}
