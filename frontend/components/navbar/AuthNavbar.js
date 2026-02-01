"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthNavbar() {
  const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");

  // 🔥 notify navbar
  window.dispatchEvent(new Event("auth-change"));

  router.push("/");
};


  return (
    <header className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/deals" className="font-semibold text-lg">
          Startup<span className="text-indigo-500">Benefits</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/deals" className="hover:text-indigo-400">
            Deals
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-400">
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
