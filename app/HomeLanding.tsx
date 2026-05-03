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
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (area !== "All") params.set("area", area);
    if (openLateOnly) params.set("openLate", "true");
    if (wifiOnly) params.set("wifi", "true");
    if (powerOnly) params.set("power", "true");
    if (quietOnly) params.set("quiet", "true");
    if (verifiedOnly) params.set("verified", "true");

    const query = params.toString();

    router.push(query ? `/venues?${query}` : "/venues");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FBF4EA] text-[#4D3827]">
      <header className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6">
        <nav className="flex items-center gap-3 text-sm font-semibold text-[#4D3827]">
          <a
            href="/venues"
            className="rounded-full border border-[#D8CDC0] bg-white/70 px-4 py-2 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FFF9F1]"
          >
            Venues
          </a>
          <a
            href="/areas"
            className="rounded-full border border-[#D8CDC0] bg-white/70 px-4 py-2 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FFF9F1]"
          >
            Areas
          </a>
          <a
            href="/about"
            className="rounded-full border border-[#D8CDC0] bg-white/70 px-4 py-2 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FFF9F1]"
          >
            About
          </a>
        </nav>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-16 pt-4 text-center">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-5xl flex-col items-center"
        >
          <Image
            src="/mellow-wordmark.png"
            alt="Mellow"
            width={760}
            height={280}
            className="mb-5 h-36 w-auto object-contain md:h-48"
            priority
          />

          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[#4D3827] md:text-4xl lg:text-5xl">
            For people who check for power points before the menu.
          </h1>

          <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#6F5D4C] md:text-lg">
            WiFi, power, noise and hours — café hunting, made mellow.
          </p>

          <div className="mt-9 flex w-full max-w-2xl items-center gap-3 rounded-[26px] border border-[#E8DDCF] bg-white/80 p-3 text-left shadow-sm">
            <Search className="ml-2 h-5 w-5 shrink-0 text-[#8E99A2]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-base font-medium text-[#4D3827] outline-none placeholder:text-[#9B8D7C]"
              placeholder="Search café, area, or street..."
            />
          </div>

          <div className="mt-6 w-full max-w-3xl rounded-[28px] border border-[#E8DDCF] bg-white/70 p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <label className="text-left text-sm font-semibold text-[#6F5D4C]">
                Area
                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#E8DDCF] bg-[#FFF9F1] px-4 py-3 text-[#4D3827] outline-none"
                >
                  {areas.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-semibold text-[#4D3827]">
                <input
                  type="checkbox"
                  checked={openLateOnly}
                  onChange={(event) => setOpenLateOnly(event.target.checked)}
                />
                Open late
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-semibold text-[#4D3827]">
                <input
                  type="checkbox"
                  checked={wifiOnly}
                  onChange={(event) => setWifiOnly(event.target.checked)}
                />
                Free WiFi
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-semibold text-[#4D3827]">
                <input
                  type="checkbox"
                  checked={powerOnly}
                  onChange={(event) => setPowerOnly(event.target.checked)}
                />
                Power spots
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-semibold text-[#4D3827]">
                <input
                  type="checkbox"
                  checked={quietOnly}
                  onChange={(event) => setQuietOnly(event.target.checked)}
                />
                Quiet only
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-semibold text-[#4D3827]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(event) => setVerifiedOnly(event.target.checked)}
                />
                Verified only
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-2xl bg-[#4D3827] px-5 py-4 text-sm font-bold text-[#FBF4EA] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3A291E]"
            >
              Find cafés
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}