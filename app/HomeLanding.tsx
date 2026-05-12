"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

const areas = [
  "All",
  "Adelaide CBD – East",
  "Adelaide CBD – West",
  "Adelaide CBD – South",
  "North Adelaide",
];

export default function HomeLanding() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All");
  const [openLateOnly, setOpenLateOnly] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(false);
  const [powerOnly, setPowerOnly] = useState(false);
  const [quietOnly, setQuietOnly] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (area !== "All") params.set("area", area);
    if (openLateOnly) params.set("openLate", "true");
    if (wifiOnly) params.set("wifi", "true");
    if (powerOnly) params.set("power", "true");
    if (quietOnly) params.set("quiet", "true");

    const query = params.toString();

    router.push(query ? `/venues?${query}` : "/venues");
  }

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

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-6 py-4">
        <nav className="flex items-center gap-3 text-sm font-semibold text-[#4D3827]">
          <a
            href="/venues"
            className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] backdrop-blur-2xl ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/35"          >
            Venues
          </a>

          <a
            href="/areas"
            className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] backdrop-blur-2xl ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/35"          >
            Areas
          </a>

          <a
            href="/about"
            className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] backdrop-blur-2xl ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/35"          >
            About
          </a>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-6 pb-6 pt-0 text-center">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-5xl flex-col items-center"
        >
          <Image
            src="/mellow-wordmark-beige-clear.png"
            alt="Mellow"
            width={760}
            height={280}
            className="mb-3 h-32 w-auto object-contain md:h-40 lg:h-48"
            priority
          />

          <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-[#F3E7D8] drop-shadow-[0_3px_12px_rgba(77,56,39,0.65)] md:text-3xl lg:text-4xl">
            For people who check for power points before the menu.
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#F3E7D8] drop-shadow-[0_2px_8px_rgba(77,56,39,0.65)] md:text-base">
            WiFi, power, noise and hours — café hunting, made mellow.
          </p>

            <div className="mt-5 flex w-full max-w-2xl items-center gap-3 rounded-[24px] border border-white/35 bg-white/25 p-3 text-left shadow-[0_8px_32px_rgba(77,56,39,0.18)] backdrop-blur-2xl ring-1 ring-white/25">            <Search className="ml-2 h-5 w-5 shrink-0 text-[#4D3827]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-base font-medium text-[#4D3827] outline-none placeholder:text-[#9B8D7C]"
              placeholder="Search café, area, or street..."
            />
          </div>

            <div className="mt-4 w-full max-w-4xl rounded-[24px] border border-white/35 bg-white/25 p-3 shadow-[0_8px_32px_rgba(77,56,39,0.18)] backdrop-blur-2xl ring-1 ring-white/25">            <div className="grid gap-2 md:grid-cols-4">
              <label
                className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-3 text-center text-sm font-semibold shadow-sm transition ${
                  openLateOnly
                    ? "border-[#4D3827] bg-[#4D3827] text-[#FBF4EA]"
                    : "border-white/35 bg-[#FFF9F1]/35 text-[#4D3827] backdrop-blur-xl hover:bg-white/75"
                }`}
              >
                <input
                  type="checkbox"
                  checked={openLateOnly}
                  onChange={(event) => setOpenLateOnly(event.target.checked)}
                  className="sr-only"
                />
                Open late
              </label>

              <label
                className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-3 text-center text-sm font-semibold shadow-sm transition ${
                  wifiOnly
                    ? "border-[#4D3827] bg-[#4D3827] text-[#FBF4EA]"
                    : "border-white/35 bg-[#FFF9F1]/35 text-[#4D3827] backdrop-blur-xl hover:bg-white/75"
                }`}
              >
                <input
                  type="checkbox"
                  checked={wifiOnly}
                  onChange={(event) => setWifiOnly(event.target.checked)}
                  className="sr-only"
                />
                Free WiFi
              </label>

              <label
                className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-3 text-center text-sm font-semibold shadow-sm transition ${
                  powerOnly
                    ? "border-[#4D3827] bg-[#4D3827] text-[#FBF4EA]"
                    : "border-white/35 bg-[#FFF9F1]/35 text-[#4D3827] backdrop-blur-xl hover:bg-white/75"
                }`}
              >
                <input
                  type="checkbox"
                  checked={powerOnly}
                  onChange={(event) => setPowerOnly(event.target.checked)}
                  className="sr-only"
                />
                Power spots
              </label>

              <label
                className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-3 text-center text-sm font-semibold shadow-sm transition ${
                  quietOnly
                    ? "border-[#4D3827] bg-[#4D3827] text-[#FBF4EA]"
                    : "border-white/35 bg-[#FFF9F1]/35 text-[#4D3827] backdrop-blur-xl hover:bg-white/75"
                }`}
              >
                <input
                  type="checkbox"
                  checked={quietOnly}
                  onChange={(event) => setQuietOnly(event.target.checked)}
                  className="sr-only"
                />
                Quiet only
              </label>

              <label className="relative w-full md:col-span-2">
                <span className="sr-only">Area</span>

                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className="h-full w-full appearance-none rounded-full border border-white/35 bg-[#FFF9F1]/35 py-3 pl-4 pr-14 text-center text-sm font-semibold text-[#4D3827] outline-none shadow-sm backdrop-blur-xl transition hover:bg-white/75"                 >
                  {areas.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#8B7B6B]">
                  ▾
                </span>
              </label>

              <button
                type="submit"
                className="rounded-full bg-[#4D3827]/85 px-5 py-3 text-sm font-bold text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.25)] ring-1 ring-white/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#3A291E] md:col-span-2"              >
                Find cafés
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}