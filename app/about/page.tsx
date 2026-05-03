import Link from "next/link";

export default function AboutPage() {
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
            href="/areas"
            className="rounded-full border border-[#D8CDC0] bg-white/70 px-4 py-2 shadow-sm"
          >
            Areas
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl py-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          The café filter Google forgot.
        </h1>

        <div className="mt-8 space-y-6 text-lg font-medium leading-8 text-[#6F5D4C]">
          <p>
            Mellow is a practical café guide for people who want to work, study
            or stay awhile without guessing the setup.
          </p>

          <p>
            Instead of only showing reviews and star ratings, Mellow focuses on
            the details that matter when you open a laptop: WiFi, power, noise,
            opening hours, accessibility and whether the venue has been checked.
          </p>

          <p>
            Each venue starts as a candidate. Once it has been checked, it can
            become verified and receive a simple Mellow Rating.
          </p>
        </div>

        <Link
          href="/venues"
          className="mt-10 inline-flex rounded-full bg-[#4D3827] px-5 py-3 text-sm font-bold text-[#FBF4EA] shadow-sm transition hover:bg-[#3A291E]"
        >
          Browse venues
        </Link>
      </section>
    </main>
  );
}