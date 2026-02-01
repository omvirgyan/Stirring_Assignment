"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardPage() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await api.get("/claims/me");
        setClaims(res.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">
          Manage your claimed startup benefits
        </p>

        {/* PROFILE */}
        <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
          <p className="text-sm text-zinc-400">Logged in as</p>
          <p className="text-lg font-medium text-white mt-1">
            Startup User
          </p>
        </div>

        {/* CLAIMS */}
        <div className="mt-10 rounded-xl bg-white text-black p-6">
          <h2 className="text-lg font-semibold mb-4">
            Your Claimed Deals
          </h2>

          {loading && (
            <p className="text-sm text-zinc-500">Loading deals…</p>
          )}

          {!loading && error && (
            <div className="border border-dashed rounded-lg p-6 text-center text-zinc-500">
              Unable to load claims.
            </div>
          )}

          {!loading && !error && claims.length === 0 && (
            <div className="border border-dashed rounded-lg p-6 text-center text-zinc-500">
              You haven’t claimed any deals yet.
            </div>
          )}

          {!loading && !error && claims.length > 0 && (
            <div className="space-y-4">
              {claims.map((claim) => (
                <div
                  key={claim._id}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div>
                    <p className="font-medium">
                      {claim.dealId?.title}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {claim.dealId?.category}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(
                      claim.status
                    )}`}
                  >
                    {claim.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
