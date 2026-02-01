"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />

      {/* Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />

      <section className="relative max-w-7xl mx-auto px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-5xl font-semibold text-white leading-tight"
        >
          Exclusive SaaS Benefits for Startups
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 max-w-xl text-zinc-400 text-lg"
        >
          Save money on cloud, design, productivity, and growth tools — curated
          for early-stage founders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex gap-4"
        >
          <Link
            href="/deals"
            className="rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
          >
            Explore Deals
          </Link>

          <Link
            href="/register"
            className="rounded-md border border-zinc-600 px-6 py-3 text-white hover:bg-white/10 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
