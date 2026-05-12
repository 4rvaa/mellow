"use client";

import { createVenueSlug } from "../lib/slugs";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Wifi,
  Plug,
  Volume2,
  Clock,
  Toilet,
  Train,
  Accessibility,
  Dog,
  Music,
  ExternalLink,
} from "lucide-react";

export type Venue = {
  name: string;
  area: string;
  address: string;
  googleMapsLink: string;
  openingHours: string;
  openLate: string;
  freeWifi: string;
  wifiTimeLimit: string;
  usablePowerSpots: string;
  noiseLevel: string;
  musicLevel: string;
  toiletAvailability: string;
  petFriendly: string;
  publicTransportAccessible: string;
  wheelchairAccessible: string;
  priceLevel: string;
  mellowRating: string;
  lastVerified: string;
  auditStatus: string;
};

const areas = [
  "All",
  "Adelaide CBD – East",
  "Adelaide CBD – West",
  "Adelaide CBD – South",
  "North Adelaide",
];

const SUGGEST_CHANGES_URL = "https://forms.gle/wS6LKzecYEUfxSiU9";

function hasUsablePower(value: string) {
  return ["1–2 usable spots", "3–5 usable spots", "6+ usable spots"].includes(
    value
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  const isUnknown = !value || value === "Unknown";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-xl ${
        isUnknown
          ? "border-white/30 bg-white/18 text-[#F3E7D8]"
          : "border-white/30 bg-white/28 text-[#FBF4EA]"
      }`}
    >
      {label}: {value || "Unknown"}
    </span>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/16 px-3 py-2 text-sm shadow-sm backdrop-blur-xl">      <Icon className="h-4 w-4 text-[#4D3827]" />
      <span className="text-[#E8DDCF]">{label}:</span>
      <span className="font-semibold text-[#FBF4EA]">
        {value || "Unknown"}
      </span>
    </div>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="group rounded-[30px] border border-white/30 bg-white/18 p-5 shadow-[0_8px_32px_rgba(77,56,39,0.22)] ring-1 ring-white/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/24 hover:shadow-xl">      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <a
            href={`/venues/${createVenueSlug(venue.name)}`}
            className="text-xl font-bold tracking-tight text-[#FBF4EA] transition hover:text-[#F3E7D8]"
          >
            {venue.name}
          </a>

          <div className="mt-1 flex items-center gap-1 text-sm font-medium text-[#E8DDCF]">
            <MapPin className="h-4 w-4" />
            {venue.area}
          </div>
        </div>

        <div className="rounded-2xl bg-[#4D3827]/90 px-3 py-2 text-sm font-bold text-[#FBF4EA] shadow-sm ring-1 ring-white/20">
          {venue.mellowRating === "Unknown" ? "Unrated" : venue.mellowRating}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge label="WiFi" value={venue.freeWifi} />
        <Badge label="Power" value={venue.usablePowerSpots} />
        <Badge label="Noise" value={venue.noiseLevel} />
        <Badge label="Open late" value={venue.openLate} />
      </div>

      <div className="mb-4 space-y-2 text-sm font-medium text-[#E8DDCF]">
        <div className="flex gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#E8DDCF]" />
          <p>{venue.openingHours || "Opening hours unknown"}</p>
        </div>

        <p>{venue.address}</p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Detail icon={Wifi} label="WiFi limit" value={venue.wifiTimeLimit} />
        <Detail icon={Plug} label="Power" value={venue.usablePowerSpots} />
        <Detail icon={Volume2} label="Noise" value={venue.noiseLevel} />
        <Detail icon={Music} label="Music" value={venue.musicLevel} />
        <Detail icon={Toilet} label="Toilets" value={venue.toiletAvailability} />
        <Detail icon={Dog} label="Pet friendly" value={venue.petFriendly} />
        <Detail
          icon={Train}
          label="Transport"
          value={venue.publicTransportAccessible}
        />
        <Detail
          icon={Accessibility}
          label="Wheelchair"
          value={venue.wheelchairAccessible}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <a
          href={venue.googleMapsLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#4D3827]/90 px-4 py-2 text-sm font-bold text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.22)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#3A291E]"
        >
          Open in Maps
          <ExternalLink className="h-4 w-4" />
        </a>

        <a
          href={SUGGEST_CHANGES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-white/35 bg-[#FFF9F1]/35 px-4 py-2 text-sm font-bold text-[#4D3827] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/75"
        >
          Suggest changes
        </a>
      </div>

        <p className="text-xs font-medium text-[#E8DDCF]">
          Verified: {venue.lastVerified || "Unknown"}
        </p>
      </div>
    </article>
  );
}

type InitialFilters = {
  search?: string;
  area?: string;
  openLateOnly?: boolean;
  wifiOnly?: boolean;
  powerOnly?: boolean;
  quietOnly?: boolean;
  verifiedOnly?: boolean;
};

export default function MellowDirectory({
  venues,
  initialFilters = {},
}: {
  venues: Venue[];
  initialFilters?: InitialFilters;
}) {
  const [search, setSearch] = useState(initialFilters.search ?? "");
  const [area, setArea] = useState(initialFilters.area ?? "All");
  const [openLateOnly, setOpenLateOnly] = useState(
    initialFilters.openLateOnly ?? false
  );
  const [wifiOnly, setWifiOnly] = useState(initialFilters.wifiOnly ?? false);
  const [powerOnly, setPowerOnly] = useState(initialFilters.powerOnly ?? false);
  const [quietOnly, setQuietOnly] = useState(initialFilters.quietOnly ?? false);
  const [verifiedOnly, setVerifiedOnly] = useState(
    initialFilters.verifiedOnly ?? false
  );

  const filtersActive =
  search.trim() !== "" ||
  area !== "All" ||
  openLateOnly ||
  wifiOnly ||
  powerOnly ||
  quietOnly ||
  verifiedOnly;

function clearFilters() {
  setSearch("");
  setArea("All");
  setOpenLateOnly(false);
  setWifiOnly(false);
  setPowerOnly(false);
  setQuietOnly(false);
  setVerifiedOnly(false);
}

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        [venue.name, venue.area, venue.address]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesArea = area === "All" || venue.area === area;
      const matchesOpenLate =
        !openLateOnly || ["Yes", "Some days"].includes(venue.openLate);
      const matchesWifi = !wifiOnly || venue.freeWifi === "Yes";
      const matchesPower = !powerOnly || hasUsablePower(venue.usablePowerSpots);
      const matchesQuiet = !quietOnly || venue.noiseLevel === "Quiet";
      const matchesVerified =
        !verifiedOnly || venue.auditStatus === "Verified";

      return (
        matchesSearch &&
        matchesArea &&
        matchesOpenLate &&
        matchesWifi &&
        matchesPower &&
        matchesQuiet &&
        matchesVerified
      );
    });
  }, [
    venues,
    search,
    area,
    openLateOnly,
    wifiOnly,
    powerOnly,
    quietOnly,
    verifiedOnly,
  ]);

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
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-6 py-4 md:grid-cols-[auto_1fr_auto]">
            <a href="/" className="justify-self-center md:justify-self-start">
              <Image
                src="/mellow-wordmark-beige-clear.png"
                alt="Mellow"
                width={190}
                height={80}
                className="h-12 w-auto object-contain"
                priority
              />
            </a>

            <div className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-[24px] border border-white/35 bg-white/25 p-3 text-left shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl">
              <Search className="ml-2 h-5 w-5 shrink-0 text-[#F3E7D8]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-base font-semibold text-[#FBF4EA] outline-none placeholder:text-[#E8DDCF]/80"
                placeholder="Search café, area, or street..."
              />
            </div>

            <nav className="flex items-center justify-center gap-3 text-sm font-semibold md:justify-end">
              <a
                href="/"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                Home
              </a>

              <a
                href="/areas"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                Areas
              </a>

              <a
                href="/about"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                About
              </a>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-5">
          <div className="grid gap-3 rounded-[28px] border border-white/35 bg-white/25 p-3 shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl md:grid-cols-[260px_repeat(5,1fr)] md:items-end">
            <label className="relative w-full">
              <span className="sr-only">Area</span>

              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="h-full w-full appearance-none rounded-full border border-white/35 bg-[#FFF9F1]/35 py-2.5 pl-4 pr-14 text-center text-sm font-semibold text-[#4D3827] shadow-sm outline-none backdrop-blur-xl transition hover:bg-white/75"
              >
                {areas.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#8B7B6B]">
                ▾
              </span>
            </label>

            <label
              className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition ${
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
              className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition ${
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
              className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition ${
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
              className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition ${
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
              Quiet
            </label>

            <label
              className={`flex w-full cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition ${
                verifiedOnly
                  ? "border-[#4D3827] bg-[#4D3827] text-[#FBF4EA]"
                  : "border-white/35 bg-[#FFF9F1]/35 text-[#4D3827] backdrop-blur-xl hover:bg-white/75"
              }`}
            >
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(event) => setVerifiedOnly(event.target.checked)}
                className="sr-only"
              />
              Verified
            </label>
          </div>
        </section>

        <section id="venues" className="mx-auto max-w-7xl px-6 py-8">
          {filteredVenues.length > 0 ? (
            <>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#F3E7D8] drop-shadow-[0_3px_12px_rgba(77,56,39,0.65)] md:text-3xl">
                  {filteredVenues.length} café(s) found
                </h1>

                <p className="mt-1 text-sm font-semibold text-[#E8DDCF] drop-shadow-[0_2px_8px_rgba(77,56,39,0.65)]">
                  Showing results from {venues.length} venues in the Mellow directory.
                </p>
              </div>

              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full border border-white/35 bg-white/25 px-5 py-3 text-sm font-bold text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
                >
                  Clear filters
                </button>
              )}
            </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredVenues.map((venue) => (
                  <VenueCard key={`${venue.name}-${venue.address}`} venue={venue} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-[30px] border border-white/35 bg-white/25 p-8 text-center text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl">
              <h2 className="text-2xl font-bold">No mellow spots found.</h2>

              <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-[#E8DDCF]">
                Try removing a filter, searching a different area, or checking back once
                more cafés have been added.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-[#FBF4EA] px-5 py-3 text-sm font-bold text-[#4D3827] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <footer className="border-t border-white/20 px-6 py-8 text-center text-sm font-semibold text-[#E8DDCF]">
          mellow.
        </footer>
      </div>
    </main>
  );
}