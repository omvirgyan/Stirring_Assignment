"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import ClaimButton from "@/components/ClaimButton";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function DealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [deal, setDeal] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  // 🔹 Mount + fetch data
  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dealRes = await api.get(`/deals/${id}`);
      setDeal(dealRes.data);

      // claims only if logged in
      if (localStorage.getItem("token")) {
        const claimsRes = await api.get("/claims/me");
        setClaims(claimsRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || loading) return <LoadingSkeleton rows={4} />;
  if (!deal) return null;

  // 🔹 Determine claim state
  const token = localStorage.getItem("token");
  const existingClaim = claims.find(
    (c) => c.dealId?._id === deal._id
  );

  let claimStatus = "login";

  if (token) {
    if (existingClaim) {
      claimStatus = "claimed";
    } else if (deal.isLocked) {
      claimStatus = "ineligible";
    } else {
      claimStatus = "eligible";
    }
  }

  // 🔹 Claim handler
  const handleClaim = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setClaiming(true);
      await api.post(`/claims/${deal._id}`);
      fetchData();
    } catch (err) {
      alert(err?.response?.data?.message || "Claim failed");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-zinc-900">
        {deal.title}
      </h1>
      <p className="mt-2 text-sm text-zinc-600">
        Partner: {deal.partnerName} • Category: {deal.category}
      </p>

      {/* DESCRIPTION */}
      <section className="mt-8">
        <h2 className="text-lg font-medium">Description</h2>
        <p className="mt-2 text-zinc-700">{deal.description}</p>
      </section>

      {/* ELIGIBILITY */}
      <section className="mt-8">
        <h2 className="text-lg font-medium">Eligibility</h2>
        <p className="mt-2 text-zinc-700">
          {deal.eligibilityCriteria || "Open to all startups"}
        </p>
      </section>

      {/* CLAIM */}
      <section className="mt-10 max-w-sm">
        <ClaimButton
          status={claimStatus}
          onClaim={handleClaim}
          loading={claiming}
        />
      </section>
    </main>
  );
}
