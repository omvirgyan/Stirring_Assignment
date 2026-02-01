"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ClaimButton({ dealId }) {
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const claim = async () => {
    try {
      setLoading(true);

      // ✅ IMPORTANT FIX: backend expects dealId in URL
      await api.post(`/claims/${dealId}`);

      setClaimed(true);
    } catch (err) {
      console.error("Claim failed:", err?.response?.data || err);
      alert(
        err?.response?.data?.message ||
          "Failed to claim deal (backend error)"
      );
    } finally {
      setLoading(false);
    }
  };

  if (claimed) {
    return (
      <span className="text-sm font-medium text-green-600">
        Claimed ✓
      </span>
    );
  }

  return (
    <button
      onClick={claim}
      disabled={loading}
      className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-60"
    >
      {loading ? "Claiming..." : "Claim"}
    </button>
  );
}
