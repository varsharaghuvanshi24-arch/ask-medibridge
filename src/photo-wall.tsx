import { useState } from "react";

import { usableImage } from "@/media";
import { Section, SectionHeading } from "@/site-ui";

/**
 * PHOTOS FOR THE HOME PAGE — EDIT THE TWO LISTS BELOW.
 *
 * Paste IMGBB *direct* links (they start with https://i.ibb.co/), one per line,
 * each between quotes and followed by a comma. Example:
 *   "https://i.ibb.co/AbCdEfG/room-1.jpg",
 *
 * While a list is empty its section stays hidden, so the site never looks broken.
 */

// Hotel / stay photos (Pinterest-style wall under the doctors).
export const HOTEL_PHOTOS: string[] = [];

// Guest photos (plain pictures, no boxes).
export const GUEST_PHOTOS: string[] = [];

function WallImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="mb-3 block h-auto w-full break-inside-avoid rounded-2xl"
    />
  );
}

/** Pinterest-style wall: pictures keep their own height and flow into columns. */
function MasonryWall({ images, alt }: { images: string[]; alt: string }) {
  const list = images.map(usableImage).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {list.map((src, i) => (
        <WallImage key={`${src}-${i}`} src={src} alt={`${alt} ${i + 1}`} />
      ))}
    </div>
  );
}

export function GuestPhotos() {
  if (GUEST_PHOTOS.map(usableImage).filter(Boolean).length === 0) return null;
  return (
    <Section>
      <SectionHeading eyebrow="Guests" title="Our guests" />
      <MasonryWall images={GUEST_PHOTOS} alt="Our guest" />
    </Section>
  );
}

export function HotelPhotos() {
  if (HOTEL_PHOTOS.map(usableImage).filter(Boolean).length === 0) return null;
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="Stay"
        title="Where you will stay"
        text="A look at the rooms and spaces where our guests stay."
      />
      <MasonryWall images={HOTEL_PHOTOS} alt="Guest stay" />
    </Section>
  );
}
