export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-zinc-500 flex justify-between">
        <span>© {new Date().getFullYear()} StartupBenefits</span>
        <span>Built for startups</span>
      </div>
    </footer>
  );
}
