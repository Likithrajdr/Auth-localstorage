"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogOut,
  Activity,
  Zap,
  Users,
  Target,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/Button";
import { toast, Toaster } from "react-hot-toast";

const handleNotImplemented = () => {
  toast.error("This feature is not implemented yet.", {
    duration: 3000,
    position: "top-right",
    style: {
      background: "#FF4B2B",
      color: "#fff",
      fontWeight: "500",
    },
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const router = useRouter();
  const user = auth.getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    auth.logout();
    router.push("/signin");
  };

  const stats = [
    {
      icon: <Users className="text-[#FF4B2B]" size={24} />,
      label: "Team Members",
      value: "8",
    },
    {
      icon: <Target className="text-[#FF4B2B]" size={24} />,
      label: "Projects",
      value: "4",
    },
    {
      icon: <TrendingUp className="text-[#FF4B2B]" size={24} />,
      label: "Growth",
      value: "+18%",
    },
    {
      icon: <Zap className="text-[#FF4B2B]" size={24} />,
      label: "Performance",
      value: "96%",
    },
  ];

  const recentActivities = [
    {
      time: "2 hours ago",
      action: "Completed project milestone",
      type: "success",
    },
    { time: "5 hours ago", action: "Team meeting scheduled", type: "info" },
    { time: "Yesterday", action: "New feature deployed", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 sm:p-6 lg:p-8"
      >
        <Toaster />
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] bg-clip-text text-transparent">
              Welcome back, {user.email?.split("@")[0]}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="flex items-center gap-2 !w-auto hover:text-[#FF4B2B]"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Activity size={24} className="text-[#FF4B2B]" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-[#FF4B2B]"
                        : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-[#FF4B2B] to-[#FF416C] rounded-2xl p-6 text-white"
          >
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button
                className="w-full p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left flex items-center gap-3"
                onClick={handleNotImplemented}
              >
                <Users size={20} />
                <span>Invite Team Member</span>
              </button>
              <button
                className="w-full p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left flex items-center gap-3"
                onClick={handleNotImplemented}
              >
                <Target size={20} />
                <span>Create New Project</span>
              </button>
              <button
                className="w-full p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left flex items-center gap-3"
                onClick={handleNotImplemented}
              >
                <Settings size={20} />
                <span>Account Settings</span>
              </button>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-white/10">
              <p className="text-sm">Need help getting started?</p>
              <button
                className="mt-2 text-sm font-medium hover:underline"
                onClick={handleNotImplemented}
              >
                View Documentation →
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
