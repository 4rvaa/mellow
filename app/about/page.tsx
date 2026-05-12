import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
                href="/areas"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                Areas
              </Link>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="max-w-5xl">
            <p className="mb-5 inline-flex rounded-full border border-white/35 bg-white/25 px-4 py-2 text-sm font-semibold text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl">
              Because vibes don&apos;t charge your laptop.
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#F3E7D8] drop-shadow-[0_3px_12px_rgba(77,56,39,0.65)] md:text-6xl">
              Built for people who need more than good coffee.
            </h1>

            <p className="mt-6 text-lg font-semibold leading-8 text-[#F3E7D8] drop-shadow-[0_2px_8px_rgba(77,56,39,0.65)]">
              Mellow is a practical café guide for people who want to work,
              study, read, or stay awhile without guessing the setup.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/30 hover:shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E8DDCF]">
                The problem
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Great coffee doesn’t mean great WiFi.
              </h2>

              <p className="mt-3 text-sm font-semibold leading-7 text-[#E8DDCF]">
                Reviews can tell you the coffee is good, but they usually do
                not tell you whether there is WiFi, power, low noise, or space
                to stay.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/30 hover:shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E8DDCF]">
                The idea
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Café hunting, made mellow.
              </h2>

              <p className="mt-3 text-sm font-semibold leading-7 text-[#E8DDCF]">
                Mellow brings the practical details into one place so you can
                choose where to go before committing to a table.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/30 hover:shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E8DDCF]">
                The goal
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Less guessing. Better cafés.
              </h2>

              <p className="mt-3 text-sm font-semibold leading-7 text-[#E8DDCF]">
                The aim is simple: help people find work-friendly cafés that
                actually fit the kind of day they are having.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-[32px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl md:p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              What Mellow checks
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Free WiFi",
                "WiFi time limits",
                "Power spots",
                "Number of outlets",
                "Noise level",
                "Music level",
                "Opening hours",
                "Open late",
                "Toilets",
                "Accessibility",
                "Public transport",
                "Price level",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/35 bg-[#FFF9F1]/35 px-4 py-3 text-sm font-bold text-[#4D3827] shadow-sm backdrop-blur-xl transition hover:bg-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl">
            <h2 className="text-2xl font-bold">Mellow Rating</h2>

            <p className="mt-4 text-sm font-semibold leading-7 text-[#E8DDCF]">
              The Mellow Rating is a simple 1–5 star guide to how suitable a
              place is for working, studying, or staying awhile. It considers
              WiFi, power, noise, comfort, hours, and overall usability.
            </p>
          </div>

          <div className="mt-12 rounded-[32px] border border-white/35 bg-[#4D3827]/75 p-8 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.22)] ring-1 ring-white/20 backdrop-blur-2xl">
            <h2 className="text-3xl font-bold tracking-tight">
              For people who check for power points before the menu.
            </h2>

            <p className="mt-4 max-w-3xl font-semibold leading-7 text-[#E8DDCF]">
              Mellow starts in Adelaide, focusing on cafés and venues where
              people can bring a laptop, settle in, and know what to expect
              before they arrive.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/venues"
                className="inline-flex rounded-full bg-[#FBF4EA] px-5 py-3 text-sm font-bold text-[#4D3827] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Browse venues
              </Link>

              <Link
                href="/areas"
                className="inline-flex rounded-full bg-[#FBF4EA] px-5 py-3 text-sm font-bold text-[#4D3827] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Browse areas
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}