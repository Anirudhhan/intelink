import React from "react";
import { Skeleton } from "../ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 p-5 px-8">
      <div className="flex items-start space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        
        <div className="flex flex-col space-y-2 w-full">
          <Skeleton className="h-30 w-3/4 rounded-xl" />

        </div>
      </div>

      <div className="flex items-start space-x-3 justify-end">
        
        <div className="flex flex-col space-y-2 w-full items-end">
          <Skeleton className="h-15 w-3/4 rounded-xl" />
        </div>
      </div>
            <div className="flex items-start space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        
        <div className="flex flex-col space-y-2 w-full">
          <Skeleton className="h-10 w-3/4 rounded-xl" />

        </div>
      </div>

      <div className="flex items-start space-x-3 justify-end">
        
        <div className="flex flex-col space-y-2 w-full items-end">
          <Skeleton className="h-12 w-3/4 rounded-xl" />
        </div>
      </div>
            <div className="flex items-start space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        
        <div className="flex flex-col space-y-2 w-full">
          <Skeleton className="h-8 w-3/4 rounded-xl" />

        </div>
      </div>

      <div className="flex items-start space-x-3 justify-end">
        
        <div className="flex flex-col space-y-2 w-full items-end">
          <Skeleton className="h-20 w-3/4 rounded-xl" />
        </div>
      </div>
            <div className="flex items-start space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        
        <div className="flex flex-col space-y-2 w-full">
          <Skeleton className="h-20 w-3/4 rounded-xl" />

        </div>
      </div>

      <div className="flex items-start space-x-3 justify-end">
        
        <div className="flex flex-col space-y-2 w-full items-end">
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
