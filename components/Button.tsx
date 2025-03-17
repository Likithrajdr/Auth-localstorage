"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full rounded-xl px-4 py-3 text-sm font-medium shadow-sm transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white hover:opacity-90",
        variant === "secondary" &&
          "bg-gray-100 text-gray-900 hover:bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
