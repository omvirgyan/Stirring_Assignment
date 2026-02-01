"use client";

export default function Filters({
  category,
  setCategory,
  access,
  setAccess,
}) {
  return (
    <div className="flex gap-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          rounded-lg
          border border-zinc-300
          bg-white
          px-3 py-2
          text-sm text-zinc-900
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
        "
      >
        <option value="">All Categories</option>
        <option value="Productivity">Productivity</option>
        <option value="Design">Design</option>
        <option value="Cloud">Cloud</option>
      </select>

      <select
        value={access}
        onChange={(e) => setAccess(e.target.value)}
        className="
          rounded-lg
          border border-zinc-300
          bg-white
          px-3 py-2
          text-sm text-zinc-900
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
        "
      >
        <option value="">All Access</option>
        <option value="locked">Locked</option>
        <option value="unlocked">Unlocked</option>
      </select>
    </div>
  );
}
