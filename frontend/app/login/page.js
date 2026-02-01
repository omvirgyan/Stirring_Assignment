"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function LoginPage() {
  // 🔹 ALL HOOKS FIRST (ORDER MATTERS)
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔹 AVOID HYDRATION ISSUES
  if (!mounted) return null;

  const submit = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ save token
      localStorage.setItem("token", res.data.token);

      // ✅ notify navbar to switch state
      window.dispatchEvent(new Event("auth-change"));

      // ✅ redirect
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex flex-col justify-center px-16 bg-zinc-50 border-r"
      >
        <h1 className="text-3xl font-semibold text-zinc-900">
          Access your startup benefits
        </h1>
        <p className="mt-4 text-zinc-600 max-w-md">
          Manage claimed deals, track approvals, and unlock exclusive offers.
        </p>
      </motion.div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-zinc-900">
            Sign in
          </h2>

          <div className="mt-8 space-y-5">
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={submit}
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-500 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>
          </div>

          <p className="mt-6 text-sm text-zinc-600">
            New here?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
