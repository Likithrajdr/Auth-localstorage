"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className={cn(
          "block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500",
          "focus:border-[#FF416C] focus:outline-none focus:ring-2 focus:ring-[#FF416C]/20",
          "transition-all duration-200 ease-in-out",
          "bg-white/50 backdrop-blur-sm",
          className
        )}
        {...props}
      />
    </motion.div>
  );
}
