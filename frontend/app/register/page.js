"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT PANEL – CONTEXT */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-zinc-900 to-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold leading-tight"
        >
          Unlock startup-only
          <br />
          SaaS benefits
        </motion.h1>

        <p className="mt-6 text-zinc-400 max-w-md">
          Join founders getting exclusive access to cloud credits,
          productivity tools, and growth platforms.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-zinc-300">
          <li>✓ Verified startup deals</li>
          <li>✓ Partner-approved benefits</li>
          <li>✓ Claim tracking dashboard</li>
        </ul>
      </div>

      {/* RIGHT PANEL – FORM */}
      <div className="flex items-center justify-center px-6 bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-zinc-900">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Get started in less than a minute.
          </p>

          <div className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@startup.com"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={submit}
              className="mt-2 w-full rounded-md bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-500 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Get Started"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
