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

export default function ResetPassword() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
    setIsPasswordValid(passwordRegex);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await auth.resetPassword(email, password);
      setSuccess(true);
      setTimeout(() => router.push("/signin"), 500);
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
          Reset Password
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Enter your email and a new password to reset your account access.
        </p>
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
      {success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-500 text-sm text-center bg-green-50 p-3 rounded-lg"
        >
          Password reset successful! Redirecting to sign in...
        </motion.p>
      )}

      <motion.form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <div className="relative">
          <Input
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        {password.length > 0 && !isPasswordValid && (
          <p className="text-xs text-red-500">
            Password must be at least 8 characters, include a number, and an
            uppercase letter.
          </p>
        )}
        <Button
          type="submit"
          disabled={!isEmailValid || !isPasswordValid}
          className={`w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] hover:from-[#FF4B2B] hover:to-[#FF416C] hover:opacity-90 transition ${
            !isEmailValid || !isPasswordValid
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Reset Password
        </Button>
      </motion.form>

      <motion.div
        className="mt-6 text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-gray-800">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="text-[#FF4B2B] hover:text-[#FF416C] transition-colors"
          >
            Back to Sign In!
          </Link>
        </p>
      </motion.div>
    </AuthCard>
  );
}
