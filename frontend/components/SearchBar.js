"use client";

export default function SearchBar({ onChange }) {
  return (
    <input
      type="text"
      placeholder="Search deals..."
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full md:w-80
        rounded-lg
        border border-zinc-300
        bg-white
        px-4 py-2
        text-sm text-zinc-900
        placeholder-zinc-400
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500
      "
    />
  );
}
