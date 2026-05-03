import Papa from "papaparse";

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

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSGJPu7qyRZPQ-UtK7Ry_ks-at0N8nkl1nuSinL5J2WzzzUf8NRwqe1LOhyniUaSaFoLChwJZ7RsKcl/pub?gid=0&single=true&output=csv";

function clean(value: unknown) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : "Unknown";
}

function get(row: Record<string, string>, possibleKeys: string[]) {
  for (const key of possibleKeys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
  }

  return "Unknown";
}

function normaliseArea(value: string) {
  const area = value.trim().replace(/\s+/g, " ").replace(/[–—]/g, "-");

  const lower = area.toLowerCase();

  if (/^adelaide cbd\s*-?\s*east$/.test(lower)) {
    return "Adelaide CBD – East";
  }

  if (/^adelaide cbd\s*-?\s*west$/.test(lower)) {
    return "Adelaide CBD – West";
  }

  if (/^adelaide cbd\s*-?\s*south$/.test(lower)) {
    return "Adelaide CBD – South";
  }

  if (lower === "north adelaide") {
    return "North Adelaide";
  }

  return area;
}

export async function getVenues(): Promise<Venue[]> {
  const response = await fetch(SHEET_CSV_URL, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Google Sheet CSV.");
  }

  const csvText = await response.text();

  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .filter((row) => clean(get(row, ["Venue Name"])) !== "Unknown")
    .map((row) => ({
      name: clean(get(row, ["Venue Name"])),
      area: normaliseArea(clean(get(row, ["Area / Suburb"]))),
      address: clean(get(row, ["Address"])),
      googleMapsLink: clean(get(row, ["Google Maps Link"])),
      openingHours: clean(get(row, ["Opening Hours"])),
      openLate: clean(get(row, ["Open Late"])),
      freeWifi: clean(get(row, ["Free WiFi", "Free Wifi", "Free Wi-Fi"])),
      wifiTimeLimit: clean(get(row, ["WiFi Time Limit", "Wifi Time Limit"])),
      usablePowerSpots: clean(get(row, ["Usable Power Spots"])),
      noiseLevel: clean(get(row, ["Noise Level"])),
      musicLevel: clean(get(row, ["Music Level"])),
      toiletAvailability: clean(get(row, ["Toilet Availability"])),
      petFriendly: clean(get(row, ["Pet Friendly"])),
      publicTransportAccessible: clean(
        get(row, ["Public Transport Accessible"])
      ),
      wheelchairAccessible: clean(get(row, ["Wheelchair Accessible"])),
      priceLevel: clean(get(row, ["Price Level"])),
      mellowRating: clean(get(row, ["Mellow Rating", "Study Score"])),
      lastVerified: clean(get(row, ["Last Verified"])),
      auditStatus: clean(get(row, ["Audit Status"])),
    }));
}