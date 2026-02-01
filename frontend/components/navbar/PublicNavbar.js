"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          Startup<span className="text-indigo-600">Benefits</span>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/deals"
            className="text-zinc-700 hover:text-zinc-900 transition"
          >
            Deals
          </Link>

          <Link
            href="/login"
            className="text-zinc-700 hover:text-zinc-900 transition"
          >
            Login
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/register"
              className="rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 transition"
            >
              Get Started
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
