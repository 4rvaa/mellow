import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accessibility,
  Clock,
  Dog,
  ExternalLink,
  MapPin,
  Music,
  Plug,
  Star,
  Toilet,
  Train,
  Volume2,
  Wifi,
} from "lucide-react";
import { getVenues } from "../../../lib/getVenues";
import { createVenueSlug } from "../../../lib/slugs";

export const revalidate = 300;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/35 bg-white/25 p-5 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-[#4D3827]" />
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#E8DDCF]">
          {label}
        </p>
      </div>

      <p className="mt-3 text-lg font-bold text-[#FBF4EA]">
        {value || "Unknown"}
      </p>
    </div>
  );
}

export default async function VenueProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const venues = await getVenues();

  const venue = venues.find((item) => createVenueSlug(item.name) === slug);

  if (!venue) {
    notFound();
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

              <Link
                href="/about"
                className="rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/venues"
            className="inline-flex rounded-full border border-white/35 bg-white/25 px-4 py-2 text-sm font-bold text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.18)] ring-1 ring-white/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/35"
          >
            ← Back to venues
          </Link>

          <div className="mt-8 rounded-[36px] border border-white/35 bg-white/25 p-8 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="inline-flex rounded-full border border-white/35 bg-[#FFF9F1]/35 px-4 py-2 text-sm font-bold text-[#4D3827] backdrop-blur-xl">
                  {venue.area}
                </p>

                <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#F3E7D8] drop-shadow-[0_3px_12px_rgba(77,56,39,0.65)] md:text-6xl">
                  {venue.name}
                </h1>

                <p className="mt-4 flex items-center gap-2 text-base font-semibold text-[#E8DDCF]">
                  <MapPin className="h-5 w-5 text-[#4D3827]" />
                  {venue.address}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#4D3827]/85 px-5 py-4 text-center text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.22)] ring-1 ring-white/20">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5" />
                  <p className="text-sm font-bold">Mellow Rating</p>
                </div>

                <p className="mt-2 text-xl font-bold">
                  {venue.mellowRating === "Unknown"
                    ? "Unrated"
                    : venue.mellowRating}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={venue.googleMapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#4D3827]/90 px-5 py-3 text-sm font-bold text-[#FBF4EA] shadow-[0_8px_24px_rgba(77,56,39,0.25)] ring-1 ring-white/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#3A291E]"
              >
                Open in Maps
                <ExternalLink className="h-4 w-4" />
              </a>

              <Link
                href="/venues"
                className="inline-flex rounded-full border border-white/35 bg-[#FFF9F1]/35 px-5 py-3 text-sm font-bold text-[#4D3827] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/75"
              >
                Browse more cafés
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DetailCard icon={Wifi} label="Free WiFi" value={venue.freeWifi} />
            <DetailCard
              icon={Wifi}
              label="WiFi limit"
              value={venue.wifiTimeLimit}
            />
            <DetailCard
              icon={Plug}
              label="Power spots"
              value={venue.usablePowerSpots}
            />
            <DetailCard
              icon={Volume2}
              label="Noise level"
              value={venue.noiseLevel}
            />
            <DetailCard
              icon={Music}
              label="Music level"
              value={venue.musicLevel}
            />
            <DetailCard icon={Clock} label="Open late" value={venue.openLate} />
            <DetailCard
              icon={Toilet}
              label="Toilets"
              value={venue.toiletAvailability}
            />
            <DetailCard
              icon={Accessibility}
              label="Wheelchair"
              value={venue.wheelchairAccessible}
            />
            <DetailCard
              icon={Train}
              label="Public transport"
              value={venue.publicTransportAccessible}
            />
            <DetailCard
              icon={Dog}
              label="Pet friendly"
              value={venue.petFriendly}
            />
            <DetailCard
              icon={Star}
              label="Price level"
              value={venue.priceLevel}
            />
            <DetailCard
              icon={Clock}
              label="Last verified"
              value={venue.lastVerified}
            />
          </div>

          <div className="mt-6 rounded-[32px] border border-white/35 bg-white/25 p-6 text-[#FBF4EA] shadow-[0_8px_32px_rgba(77,56,39,0.18)] ring-1 ring-white/25 backdrop-blur-2xl">
            <h2 className="text-2xl font-bold">Opening hours</h2>

            <p className="mt-4 text-sm font-semibold leading-7 text-[#E8DDCF]">
              {venue.openingHours || "Opening hours unknown"}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}