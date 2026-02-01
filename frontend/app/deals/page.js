"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import DealCard from "@/components/DealCard";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [access, setAccess] = useState("all");

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await api.get("/deals");
      setDeals(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = deals.filter((deal) => {
    const matchSearch = deal.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "all" || deal.category === category;
    const matchAccess =
      access === "all" || deal.access === access;

    return matchSearch && matchCategory && matchAccess;
  });

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800">
      {/* subtle premium glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-white">
            Startup Deals
          </h1>
          <p className="mt-2 text-zinc-400 max-w-2xl">
            Curated SaaS, cloud, and productivity tools for early-stage
            startups.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <Filters
            category={category}
            setCategory={setCategory}
            access={access}
            setAccess={setAccess}
          />
        </div>

        {/* DEALS GRID */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          {loading ? (
            <LoadingSkeleton />
          ) : filteredDeals.length === 0 ? (
            <p className="text-center text-zinc-500 py-16">
              No deals found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <DealCard key={deal._id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
