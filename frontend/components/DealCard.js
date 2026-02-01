"use client";

import Link from "next/link";
import ClaimButton from "./ClaimButton";

export default function DealCard({ deal }) {
  const isAuth =
    typeof window !== "undefined" && localStorage.getItem("token");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-zinc-900">{deal.title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{deal.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs rounded-full bg-zinc-100 px-3 py-1">
          {deal.category}
        </span>

        {isAuth ? (
          <ClaimButton dealId={deal._id} />
        ) : (
          <Link
            href="/login"
            className="text-sm text-indigo-600 hover:underline"
          >
            Login to claim →
          </Link>
        )}
      </div>
    </div>
  );
}
