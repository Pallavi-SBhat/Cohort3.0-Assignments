import React from "react";
import { cn } from "@/libs/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  interactive?: boolean;
  delay?: number;
}

const Tooltip = ({
  content,
  children,
  position = "top",
  className,
  interactive = false,
  delay = 0,
}: TooltipProps) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-800 dark:border-t-gray-200 border-l-transparent border-r-transparent border-b-transparent border-[6px]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 dark:border-b-gray-200 border-l-transparent border-r-transparent border-t-transparent border-[6px]",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-800 dark:border-l-gray-200 border-t-transparent border-b-transparent border-r-transparent border-[6px]",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-800 dark:border-r-gray-200 border-t-transparent border-b-transparent border-l-transparent border-[6px]",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={cn(
          "absolute z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          !interactive && "pointer-events-none",
          positionClasses[position],
          className
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="relative bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm px-3 py-1.5 rounded-md shadow-lg">
          {content}
          <div className={cn("absolute w-0 h-0", arrowClasses[position])} />
        </div>
      </div>
    </div>
  );
};

export { Tooltip };
