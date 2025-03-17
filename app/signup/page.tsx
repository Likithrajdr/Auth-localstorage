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

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const isValidEmail = (email: string) =>
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isPasswordStrong = (password: string) =>
    password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);

  const isFormValid =
    fullName.trim() !== "" &&
    isValidEmail(email) &&
    isPasswordStrong(password) &&
    password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("its here");
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await auth.signup(email, password);
      router.push("/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <AuthCard className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-md max-w-sm mx-auto flex flex-col">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] bg-clip-text text-transparent">
          Sign Up
        </h2>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs text-center bg-red-50 p-2 rounded-lg mt-3"
        >
          {error}
        </motion.p>
      )}

      <motion.div
        className="mt-4 space-y-4 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isValidEmail(email) && email.length > 0 && (
            <p className="text-xs text-red-500">Invalid email format.</p>
          )}

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          {password.length > 0 && !isPasswordStrong(password) && (
            <p className="text-xs text-red-500">
              Password must be at least 8 characters, include a number, and an
              uppercase letter.
            </p>
          )}

          <div className="relative">
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>

          {confirmPassword.length > 0 && password !== confirmPassword && (
            <p className="text-xs text-red-500">Passwords do not match.</p>
          )}
          <Button
            type="submit"
            className={`w-full py-2 font-semibold rounded-lg transition-all duration-200 
          bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white 
          ${
            isFormValid
              ? "hover:opacity-90"
              : "cursor-not-allowed brightness-75"
          }
        `}
            disabled={!isFormValid}
          >
            Sign Up
          </Button>
        </form>
      </motion.div>

      <motion.p
        className="mt-4 text-center text-xs text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-[#FF4B2B] hover:text-[#FF416C] transition-colors"
        >
          Sign in
        </Link>
      </motion.p>
    </AuthCard>
  );
}
