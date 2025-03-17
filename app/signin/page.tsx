"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { auth } from "@/lib/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await auth.signin(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <AuthCard className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] bg-clip-text text-transparent">
          Welcome Back
        </h2>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"
        >
          {error}
        </motion.p>
      )}

      <motion.form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Input label="Email" name="email" type="email" required />
        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        <Button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] hover:from-[#FF4B2B] hover:to-[#FF416C] hover:opacity-90 transition"
        >
          Sign In
        </Button>
      </motion.form>

      <motion.div
        className="mt-6 text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/reset-password"
          className="block text-sm text-[#FF4B2B] hover:text-[#FF416C] transition-colors"
        >
          Forgot your password?
        </Link>
        <p className="text-sm text-gray-800">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#FF4B2B] hover:text-[#FF416C] transition-colors"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </AuthCard>
  );
}
