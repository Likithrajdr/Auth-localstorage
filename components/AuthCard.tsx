"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFE4E1] to-[#FFDAB9]
"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "max-w-md w-full space-y-8  p-8 rounded-2xl shadow-xl border border-white/20",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
