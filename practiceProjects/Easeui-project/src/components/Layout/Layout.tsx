import React from "react";
import { cn } from "@/libs/utils";

// --- Container Component ---
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = ({ children, size = "lg", className, ...props }: ContainerProps) => {
  const sizes = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props}>
      {children}
    </div>
  );
};

// --- Flex Component ---
interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "col";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
}

const Flex = ({
  children,
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = "nowrap",
  gap = 4,
  className,
  ...props
}: FlexProps) => {
  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        justifyClasses[justify],
        alignClasses[align],
        wrap === "wrap" ? "flex-wrap" : wrap === "wrap-reverse" ? "flex-wrap-reverse" : "flex-nowrap",
        className
      )}
      style={{ gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Grid Component ---
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: number | string;
}

const Grid = ({ children, cols = 1, gap = 4, className, ...props }: GridProps) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
  };

  return (
    <div
      className={cn("grid", colClasses[cols], className)}
      style={{ gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Stack Component ---
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: number | string;
  align?: "start" | "end" | "center" | "stretch";
}

const Stack = ({ children, gap = 4, align = "stretch", className, ...props }: StackProps) => {
  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch",
  };

  return (
    <div
      className={cn("flex flex-col", alignClasses[align], className)}
      style={{ gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Center Component ---
interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Center = ({ children, className, ...props }: CenterProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      {children}
    </div>
  );
};

// --- Divider Component ---
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Divider = ({ orientation = "horizontal", className, ...props }: DividerProps) => {
  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700",
        orientation === "horizontal" ? "h-px w-full my-4" : "w-px h-full mx-4",
        className
      )}
      role="separator"
      {...props}
    />
  );
};

export { Container, Flex, Grid, Stack, Center, Divider };
