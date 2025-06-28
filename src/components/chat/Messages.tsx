'use client';
import React, { useState } from "react";
import ChatSkeleton from "./ChatSkeleton";

const Messages = () => {
  const [isChatLoading, setIsChatLoading] = useState(false);
  return (
    <div>
      {isChatLoading && <ChatSkeleton />}
    </div>
  );
};

export default Messages;
