import { useState } from "react";

import { usableImage } from "@/media";
import { Section, SectionHeading } from "@/site-ui";

/**
 * PHOTOS FOR THE HOME PAGE.
 *
 * Easiest way: upload the pictures straight into these two GitHub folders.
 * No code to edit, any file name works, any number of pictures:
 *
 *   src/assets/hotel/    -> hotel / stay photos
 *   src/assets/guests/   -> guest photos
 *
 * Supported: .jpg .jpeg .png .webp (not .heic). Pictures show in file-name order.
 * While a folder is empty its section stays hidden, so the site never looks broken.
 *
 * Optional: you can still paste IMGBB *direct* links (https://i.ibb.co/...) below.
 */
const HOTEL_LINKS: string[] = [];
const GUEST_LINKS: string[] = [];

function fromFolder(files: Record<string, string>): string[] {
  return Object.keys(files)
    .sort()
    .map((k) => files[k]);
}

const hotelFiles = import.meta.glob("/src/assets/hotel/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const guestFiles = import.meta.glob("/src/assets/guests/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Hotel / stay photos (Pinterest-style wall under the doctors).
export const HOTEL_PHOTOS: string[] = [...fromFolder(hotelFiles), ...HOTEL_LINKS];

// Guest photos (plain pictures, no boxes).
export const GUEST_PHOTOS: string[] = [...fromFolder(guestFiles), ...GUEST_LINKS];

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
