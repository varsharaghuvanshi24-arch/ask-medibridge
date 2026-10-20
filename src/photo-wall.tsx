import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { usableImage } from "@/media";
import { Container, Section, SectionHeading } from "@/site-ui";

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
  return Object.entries(files)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([, v]) => v)
    .filter((v): v is string => Boolean(v));
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

function WallImage({
  src,
  alt,
  index = 0,
  staggered = false,
}: {
  src: string;
  alt: string;
  index?: number;
  staggered?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={staggered ? ({ "--i": Math.min(index, 12) } as CSSProperties) : undefined}
      className={`mb-3 block h-auto w-full break-inside-avoid rounded-2xl${staggered ? " wall-item" : ""}`}
    />
  );
}

/** Pinterest-style wall: pictures keep their own height and flow into columns. */
function MasonryWall({
  images,
  alt,
  staggered = false,
}: {
  images: string[];
  alt: string;
  staggered?: boolean;
}) {
  const list = images.map(usableImage).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {list.map((src, i) => (
        <WallImage key={`${src}-${i}`} src={src} alt={`${alt} ${i + 1}`} index={i} staggered={staggered} />
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

/**
 * A dim "room" with a frosted-glass panel. When it scrolls into view the panel opens,
 * its edges catch the light, the room brightens and the pictures rise in one by one.
 */
function GlassRoom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} data-no-reveal="" className={`glass-room${open ? " is-open" : ""}`}>
      {children}
    </section>
  );
}

export function HotelPhotos() {
  if (HOTEL_PHOTOS.map(usableImage).filter(Boolean).length === 0) return null;
  return (
    <GlassRoom>
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Stay"
          title="Where you will stay"
          text="A look at the rooms and spaces where our guests stay."
        />
        <div className="glass-panel">
          <span className="glass-rim glass-rim-top" aria-hidden="true" />
          <span className="glass-rim glass-rim-bottom" aria-hidden="true" />
          <MasonryWall images={HOTEL_PHOTOS} alt="Guest stay" staggered />
        </div>
      </Container>
    </GlassRoom>
  );
}
