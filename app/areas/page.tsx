import Link from "next/link";

const areas = [
  "Adelaide CBD – East",
  "Adelaide CBD – West",
  "Adelaide CBD – South",
  "North Adelaide",
];

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-[#FBF4EA] px-6 py-8 text-[#4D3827]">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          mellow.
        </Link>

        <nav className="flex items-center gap-3 text-sm font-semibold">
          <Link
            href="/venues"
            className="rounded-full border border-[#D8CDC0] bg-white/70 px-4 py-2 shadow-sm"
          >
            Venues
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-[#D8CDC0] bg-white/70 px-4 py-2 shadow-sm"
          >
            About
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl py-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Browse by area.
        </h1>
        <p className="mt-4 max-w-2xl text-lg font-medium text-[#6F5D4C]">
          Start with the Adelaide zones Mellow is checking first.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <Link
              key={area}
              href={`/venues?area=${encodeURIComponent(area)}`}
              className="rounded-[28px] border border-[#E8DDCF] bg-[#FFF9F1] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xl font-bold">{area}</p>
              <p className="mt-3 text-sm font-medium text-[#6F5D4C]">
                View cafés in this area
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}