"use client";

import { MessageCircle, MessageSquare, Phone } from "lucide-react";
import BottomActionBar from "@/components/BottomActionBar";

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
    <BottomActionBar
      maxWidthClassName="max-w-5xl"
      items={[
        {
          key: "comments",
          label: "Comments",
          icon: <MessageCircle className="h-4 w-4" />,
          onClick: onComments,
          active: commentsActive,
        },
        {
          key: "messages",
          label: "Messages",
          icon: <MessageSquare className="h-4 w-4" />,
          onClick: onGroupChat,
          active: groupChatActive,
        },
        {
          key: "calls",
          label: "Calls",
          icon: <Phone className="h-4 w-4" />,
          onClick: onCall,
          active: callActive,
        },
      ]}
    />
  );
}
