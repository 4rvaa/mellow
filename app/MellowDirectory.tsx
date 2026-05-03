"use client";

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
  Filter,
} from "lucide-react";

import Image from "next/image";

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

const openLateOptions = ["All", "Yes", "Some days", "No", "Unknown"];

function hasUsablePower(value: string) {
  return ["1–2 usable spots", "3–5 usable spots", "6+ usable spots"].includes(
    value
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  const isUnknown = !value || value === "Unknown";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        isUnknown
          ? "border-[#E3D8C9] bg-[#FBF4EA] text-[#8B7B6B]"
          : "border-[#D4D7CD] bg-[#EFF1EA] text-[#4D3827]"
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
    <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDCF] bg-white/60 px-3 py-2 text-sm">
      <Icon className="h-4 w-4 text-[#8E99A2]" />
      <span className="text-[#8B7B6B]">{label}:</span>
      <span className="font-medium text-[#4D3827]">{value || "Unknown"}</span>
    </div>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="rounded-[28px] border border-[#E8DDCF] bg-[#FFF9F1] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[#4D3827]">
            {venue.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-[#8B7B6B]">
            <MapPin className="h-4 w-4" />
            {venue.area}
          </div>
        </div>

        <div className="rounded-2xl bg-[#4D3827] px-3 py-2 text-sm font-semibold text-[#FBF4EA]">
          {venue.mellowRating === "Unknown" ? "Unrated" : venue.mellowRating}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge label="WiFi" value={venue.freeWifi} />
        <Badge label="Power" value={venue.usablePowerSpots} />
        <Badge label="Noise" value={venue.noiseLevel} />
        <Badge label="Open late" value={venue.openLate} />
      </div>

      <div className="mb-4 space-y-2 text-sm text-[#6F5D4C]">
        <div className="flex gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8E99A2]" />
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

      <div className="mt-5 flex items-center justify-between gap-3">
        <a
          href={venue.googleMapsLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#4D3827] px-4 py-2 text-sm font-medium text-[#FBF4EA] hover:bg-[#3A291E]"
        >
          Open in Maps
          <ExternalLink className="h-4 w-4" />
        </a>

        <p className="text-xs text-[#8B7B6B]">
          Verified: {venue.lastVerified || "Unknown"}
        </p>
      </div>
    </article>
  );
}

export default function MellowDirectory({ venues }: { venues: Venue[] }) {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All");
  const [openLate, setOpenLate] = useState("All");
  const [wifiOnly, setWifiOnly] = useState(false);
  const [powerOnly, setPowerOnly] = useState(false);
  const [quietOnly, setQuietOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

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
        openLate === "All" || venue.openLate === openLate;
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
  }, [venues, search, area, openLate, wifiOnly, powerOnly, quietOnly, verifiedOnly]);

  return (
    <main className="min-h-screen bg-[#FBF4EA] text-[#4D3827]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/mellow-wordmark.png"
            alt="Mellow"
            width={190}
            height={80}
            className="h-14 w-auto"
            priority
          />
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#6F5D4C] md:flex">
          <a href="#venues" className="hover:text-[#4D3827]">
            Venues
          </a>
          <a href="#areas" className="hover:text-[#4D3827]">
            Areas
          </a>
          <a href="#about" className="hover:text-[#4D3827]">
            About
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-10">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-[#E8DDCF] bg-white/60 px-4 py-2 text-sm font-medium text-[#6F5D4C]">
            Because vibes don't charge your laptop.
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            For people who check for power points before the menu.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6F5D4C]">
            WiFi, power, noise and hours - café hunting, made mellow.
          </p>

          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-[24px] border border-[#E8DDCF] bg-white/70 p-3 shadow-sm">
            <Search className="ml-2 h-5 w-5 text-[#8E99A2]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-base outline-none placeholder:text-[#9B8D7C]"
              placeholder="Search café, area, or street..."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8" id="areas">
        <div className="grid gap-4 md:grid-cols-4">
          {areas.slice(1).map((areaName) => (
            <button
              key={areaName}
              onClick={() => setArea(areaName)}
              className={`rounded-[24px] border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                area === areaName
                  ? "border-[#4D3827] bg-[#4D3827] text-[#FBF4EA]"
                  : "border-[#E8DDCF] bg-[#FFF9F1] text-[#4D3827]"
              }`}
            >
              <p className="font-semibold">{areaName}</p>
              <p
                className={`mt-2 text-sm ${
                  area === areaName ? "text-[#E8DDCF]" : "text-[#8B7B6B]"
                }`}
              >
                {venues.filter((venue) => venue.area === areaName).length} venues
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[28px] border border-[#E8DDCF] bg-white/60 p-5">
          <div className="mb-4 flex items-center gap-2 font-medium">
            <Filter className="h-4 w-4 text-[#8E99A2]" />
            Filters
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-medium text-[#6F5D4C]">
              Area
              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8DDCF] bg-[#FFF9F1] px-4 py-3 outline-none"
              >
                {areas.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#6F5D4C]">
              Open late
              <select
                value={openLate}
                onChange={(event) => setOpenLate(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8DDCF] bg-[#FFF9F1] px-4 py-3 outline-none"
              >
                {openLateOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={wifiOnly}
                onChange={(event) => setWifiOnly(event.target.checked)}
              />
              Free WiFi only
            </label>

            <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={powerOnly}
                onChange={(event) => setPowerOnly(event.target.checked)}
              />
              Has power spots
            </label>

            <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={quietOnly}
                onChange={(event) => setQuietOnly(event.target.checked)}
              />
              Quiet only
            </label>

            <label className="flex items-center gap-3 rounded-2xl bg-[#FFF9F1] px-4 py-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(event) => setVerifiedOnly(event.target.checked)}
              />
              Verified only
            </label>
          </div>
        </div>
      </section>

      <section id="venues" className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Venue directory
            </h2>
            <p className="mt-1 text-[#6F5D4C]">
              Showing {filteredVenues.length} of {venues.length} venues.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredVenues.map((venue) => (
            <VenueCard key={`${venue.name}-${venue.address}`} venue={venue} />
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[32px] bg-[#4D3827] p-8 text-[#FBF4EA] md:p-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Built for people who open laptops in cafés.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#E8DDCF]">
            Mellow is a simple café guide for checking the practical details
            before you sit down: WiFi, power, noise, opening hours, toilets,
            accessibility and whether the venue has been verified.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#E8DDCF] px-6 py-8 text-center text-sm text-[#8B7B6B]">
        mellow · cafés to work from
      </footer>
    </main>
  );
}