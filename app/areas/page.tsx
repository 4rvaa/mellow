import Image from "next/image";
import Link from "next/link";

const areas = [
  "Adelaide CBD – East",
  "Adelaide CBD – West",
  "Adelaide CBD – South",
  "North Adelaide",
];

export default function AreasPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[#4D3827]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-35"
          src="/mellow-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-[#4D3827]/30" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/">
              <Image
                src="/mellow-wordmark-beige-clear.png"
                alt="Mellow"
                width={190}
                height={80}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="flex items-center gap-3 text-sm font-semibold">
              <Link
                href="/"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                Home
              </Link>

              <Link
                href="/venues"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                Venues
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-[#F3E7D8] drop-shadow-[0_3px_12px_rgba(77,56,39,0.65)] md:text-5xl">
            Browse by area.
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-semibold text-[#F3E7D8] drop-shadow-[0_2px_8px_rgba(77,56,39,0.65)]">
            Start with the Adelaide zones Mellow is verifying first.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <Link
                key={area}
                href={`/venues?area=${encodeURIComponent(area)}`}
                className="group rounded-[28px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/45 hover:bg-[#4D3827]/85 hover:shadow-xl"
              >
                <p className="text-xl font-bold drop-shadow-[0_2px_8px_rgba(77,56,39,0.45)]">
                  {area}
                </p>

                <p className="mt-3 text-sm font-semibold text-[#E8DDCF] transition group-hover:text-[#FBF4EA]">
                  View cafés in this area
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}