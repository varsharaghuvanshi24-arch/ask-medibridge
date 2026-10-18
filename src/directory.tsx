/**
 * Hospitals and doctors: listing pages, profile pages and the home-page strip.
 * The content comes from src/site-data.ts and the photos from src/media.ts.
 */
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  MapPin,
  MessageCircle,
  Navigation,
  Search,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EnquiryForm } from "@/enquiry-form";
import { DOCTOR_PHOTO, HOSPITAL_COVER, HOSPITAL_GALLERY, usableImage } from "@/media";
import {
  doctorBySlug,
  doctors,
  featuredDoctorSlugs,
  hospitalBySlug,
  hospitals,
  treatments,
  type Doctor,
  type Hospital,
} from "@/site-data";
import {
  CardBox,
  EnquiryButton,
  PageHero,
  PageLink,
  Section,
  SectionHeading,
  whatsappHref,
} from "@/site-ui";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const INDEPENDENCE_NOTE =
  "Hospitals and doctors are independent of Medibridge. Treatment decisions are made between you and your treating doctor.";

/** WhatsApp link with a ready message, or "" when no WhatsApp number is set. */
function waLink(message: string) {
  const base = whatsappHref();
  return base ? `${base}?text=${encodeURIComponent(message)}` : "";
}

/** WhatsApp button that falls back to the contact page when there is no number. */
function WhatsAppButton({
  message,
  label = "WhatsApp",
  className,
}: {
  message: string;
  label?: string;
  className?: string;
}) {
  const href = waLink(message);
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1f9d55] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#188347]",
    className,
  );
  if (!href) {
    return (
      <PageLink page="contact" className={classes}>
        <MessageCircle className="h-4 w-4" aria-hidden /> {label}
      </PageLink>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      <MessageCircle className="h-4 w-4" aria-hidden /> {label}
    </a>
  );
}

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z]/g, "")[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Shows the picture when it loads; otherwise the fallback, so nothing ever looks broken. */
function SmartImage({
  src,
  alt,
  className,
  fallback,
}: {
  src: string | undefined;
  alt: string;
  className?: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const url = usableImage(src);
  if (!url || failed) return <>{fallback}</>;
  return (
    <img src={url} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />
  );
}

function HospitalTile({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary to-brand p-4 text-center text-primary-foreground",
        className,
      )}
    >
      <Building2 className="h-9 w-9 opacity-90" aria-hidden />
      <span className="text-sm font-medium opacity-90">{name}</span>
    </div>
  );
}

function DoctorInitials({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-brand font-display text-5xl font-semibold text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}

function AccreditationBadges({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((a) => (
        <li
          key={a}
          className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground"
        >
          {a}
        </li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary">
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Link a specialty to the matching treatment page when one exists. */
function treatmentSlugFor(text: string): string | null {
  const t = text.toLowerCase();
  const rules: [RegExp, string][] = [
    [/oncolog|cancer|bmt|marrow/, "oncology"],
    [/cardi|heart|ctvs/, "cardiology"],
    [/neuro|spine|brain/, "neurology-spine"],
    [/ortho|joint/, "orthopaedics"],
    [/urolog|nephrolog|kidney/, "kidney-urology"],
    [/ivf|fertil/, "fertility"],
    [/liver|gastro/, "gastro-liver"],
    [/bariatric|weight/, "bariatric"],
  ];
  for (const [re, slug] of rules) {
    if (re.test(t) && treatments.some((x) => x.slug === slug)) return slug;
  }
  return null;
}

function TreatmentChips({ items }: { items: string[] }) {
  const seen = new Set<string>();
  const chips = items
    .map((label) => ({ label, slug: treatmentSlugFor(label) }))
    .filter((c) => {
      const key = c.slug ?? c.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <li key={c.label}>
          {c.slug ? (
            <Link
              to="/treatments/$slug"
              params={{ slug: c.slug }}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              {c.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : (
            <span className="inline-flex rounded-full border bg-card px-4 py-2 text-sm font-medium text-primary">
              {c.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

export function HospitalCard({ h }: { h: Hospital }) {
  return (
    <CardBox className="group flex flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg sm:p-0">
      <Link
        to="/hospitals/$slug"
        params={{ slug: h.slug }}
        className="block aspect-[16/10] overflow-hidden bg-surface"
        aria-label={`View ${h.name}`}
      >
        <SmartImage
          src={HOSPITAL_COVER[h.slug]}
          alt={`${h.name}, ${h.city}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallback={<HospitalTile name={h.name} />}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <AccreditationBadges items={h.accreditations} />
        <h3 className="mt-3 text-xl font-semibold text-primary">{h.name}</h3>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {h.area}, {h.city}
        </p>
        <p className="mt-2 text-sm font-medium text-foreground/80">
          {h.stats
            .slice(0, 3)
            .map((s) => `${s.value} ${s.label.toLowerCase()}`)
            .join(" · ")}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{h.summary}</p>
        <div className="mt-4">
          <Tags items={h.specialties} />
        </div>
        <Link
          to="/hospitals/$slug"
          params={{ slug: h.slug }}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          View hospital <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </CardBox>
  );
}

export function DoctorCard({ d }: { d: Doctor }) {
  return (
    <CardBox className="group flex flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg sm:p-0">
      <Link
        to="/doctors/$slug"
        params={{ slug: d.slug }}
        className="block aspect-[4/5] overflow-hidden bg-surface"
        aria-label={`View profile of ${d.name}`}
      >
        <SmartImage
          src={DOCTOR_PHOTO[d.slug]}
          alt={d.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          fallback={<DoctorInitials name={d.name} />}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-primary">{d.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand">{d.speciality}</p>
        <p className="mt-1 text-sm text-muted-foreground">{d.hospital}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            to="/doctors/$slug"
            params={{ slug: d.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            View profile <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href={
              waLink(
                `Hello Medibridge International, I'd like to request an appointment with ${d.name}.`,
              ) || "/contact"
            }
            {...(whatsappHref() ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Request appointment
          </a>
        </div>
      </div>
    </CardBox>
  );
}

/* ------------------------------------------------------------------ */
/* Listing pages                                                       */
/* ------------------------------------------------------------------ */

export function HospitalsPage() {
  const [tag, setTag] = useState("All");
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(hospitals.flatMap((h) => h.specialties))).sort()],
    [],
  );
  const shown = tag === "All" ? hospitals : hospitals.filter((h) => h.specialties.includes(tag));

  return (
    <>
      <PageHero
        title="Partner hospitals"
        intro={`${hospitals.length} accredited super-specialty hospitals across Gurugram and New Delhi. These are hospitals we coordinate treatment at.`}
      />
      <Section>
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter hospitals by specialty"
        >
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                tag === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-primary hover:bg-accent",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((h) => (
            <HospitalCard key={h.slug} h={h} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Compare"
          title="Hospitals at a glance"
          text="Figures are the hospitals' own published numbers and may change."
        />
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital</TableHead>
                <TableHead>Accreditation</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Scale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitals.map((h) => (
                <TableRow key={h.slug}>
                  <TableCell className="font-medium">
                    <Link
                      to="/hospitals/$slug"
                      params={{ slug: h.slug }}
                      className="text-primary hover:underline"
                    >
                      {h.name}
                    </Link>
                  </TableCell>
                  <TableCell>{h.accreditations.join(" · ")}</TableCell>
                  <TableCell>
                    {h.area}, {h.city}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {h.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" · ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl bg-primary p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
            Not sure which hospital fits your case?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Send your reports and we will suggest hospitals and doctors to compare with you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <EnquiryButton variant="outline" label="Get matched" />
            <WhatsAppButton message="Hello Medibridge International, please help me choose a hospital." />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-xs text-primary-foreground/70">
            {INDEPENDENCE_NOTE}
          </p>
        </div>
      </Section>
    </>
  );
}

export function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [hospital, setHospital] = useState("all");

  const hospitalTabs = useMemo(() => {
    const slugs = Array.from(new Set(doctors.map((d) => d.hospitalSlug)));
    return slugs.map((slug) => ({ slug, name: hospitalBySlug(slug)?.name ?? slug }));
  }, []);

  const q = query.trim().toLowerCase();
  const shown = doctors.filter(
    (d) =>
      (hospital === "all" || d.hospitalSlug === hospital) &&
      (!q || `${d.name} ${d.speciality} ${d.hospital}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <PageHero
        title="Doctors and specialists"
        intro={`A curated panel of ${doctors.length} specialists across our partner hospitals.`}
      />
      <Section>
        <div className="relative mb-5 max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by doctor, specialty or hospital"
            aria-label="Search doctors"
            className="h-12 w-full rounded-full border bg-card pl-11 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter doctors by hospital"
        >
          {[{ slug: "all", name: "All" }, ...hospitalTabs].map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setHospital(t.slug)}
              aria-pressed={hospital === t.slug}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                hospital === t.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-primary hover:bg-accent",
              )}
            >
              {t.name}
            </button>
          ))}
        </div>

        {shown.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((d) => (
              <DoctorCard key={d.slug} d={d} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
            No doctor matches your search. Try another name, or ask us to recommend a specialist.
          </p>
        )}
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold text-primary sm:text-4xl">
            Want us to recommend a doctor?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Share your reports and we will suggest specialists who can review your case.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <EnquiryButton label="Contact us" />
            <WhatsAppButton message="Hello Medibridge International, please recommend a doctor for my case." />
          </div>
          <p className="mx-auto mt-6 text-xs text-muted-foreground">{INDEPENDENCE_NOTE}</p>
        </div>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Profile pages                                                       */
/* ------------------------------------------------------------------ */

function Breadcrumb({ trail }: { trail: ReactNode }) {
  return <div className="mb-6 text-sm text-muted-foreground">{trail}</div>;
}

function PhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const list = images.map(usableImage).filter(Boolean);
  if (!list.length) return null;
  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 [&>button]:mb-3">
        {list.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className="block w-full overflow-hidden rounded-2xl"
            aria-label={`Open photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${alt}, photo ${i + 1}`}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {open !== null && (
            <img
              src={list[open]}
              alt={`${alt}, photo ${open + 1}`}
              className="max-h-[85vh] w-full rounded-2xl object-contain"
            />
          )}
          {open !== null && list.length > 1 && (
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((open - 1 + list.length) % list.length)}
                className="rounded-full bg-background px-4 py-2 text-sm font-medium"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setOpen((open + 1) % list.length)}
                className="rounded-full bg-background px-4 py-2 text-sm font-medium"
              >
                Next
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const helpsList = [
  "A specialist review of your reports and a written estimate range",
  "Help requesting the hospital invitation letter for your visa",
  "Airport pickup, accommodation suggestions near the hospital and local transport help",
  "A coordinator and language support during admission and treatment",
  "Follow-up consultations with your treating team after you return home",
];

export function HospitalProfile({ h }: { h: Hospital }) {
  const docs = doctors.filter((d) => d.hospitalSlug === h.slug);
  const related = hospitals.filter((x) => x.slug !== h.slug).slice(0, 3);
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(h.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery)}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(h.mapQuery)}`;

  return (
    <>
      <div className="border-b bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumb
            trail={
              <>
                <PageLink
                  page="hospitals"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden /> All hospitals
                </PageLink>
              </>
            }
          />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <AccreditationBadges items={h.accreditations} />
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-primary sm:text-5xl">
                {h.name}
              </h1>
              <p className="mt-3 flex items-start gap-1.5 text-muted-foreground">
                <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden /> {h.address}
              </p>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{h.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <EnquiryButton label="Get a quote for this hospital" />
                <WhatsAppButton
                  message={`Hello Medibridge International, I'd like a quote for treatment at ${h.name}.`}
                />
              </div>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-surface shadow-md">
              <SmartImage
                src={HOSPITAL_COVER[h.slug]}
                alt={`${h.name}, ${h.city}`}
                className="h-full w-full object-cover"
                fallback={<HospitalTile name={h.name} />}
              />
            </div>
          </div>
        </div>
      </div>

      <Section>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {h.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card p-4">
              <dd className="text-xl font-semibold text-primary">{s.value}</dd>
              <dt className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Overview</h2>
            <p className="mt-3 text-muted-foreground">{h.overview}</p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand">
              Key specialties
            </h3>
            <div className="mt-3">
              <Tags items={h.specialties} />
            </div>
          </div>
          <CardBox>
            <h2 className="text-xl font-semibold text-primary">How Medibridge helps</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {helpsList.map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </CardBox>
        </div>
      </Section>

      {usableGallery(h.slug).length > 0 && (
        <Section tone="surface">
          <SectionHeading eyebrow="Photos" title={`Inside ${h.name}`} />
          <PhotoGallery images={HOSPITAL_GALLERY[h.slug] ?? []} alt={h.name} />
        </Section>
      )}

      <Section tone={usableGallery(h.slug).length > 0 ? "plain" : "surface"}>
        <SectionHeading eyebrow="Doctors" title={`Specialists at ${h.name}`} />
        {docs.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {docs.map((d) => (
              <DoctorCard key={d.slug} d={d} />
            ))}
          </div>
        ) : (
          <CardBox>
            <p className="text-muted-foreground">
              Our specialist panel for this hospital is being updated.
            </p>
            <div className="mt-4">
              <EnquiryButton label="Ask us to recommend a specialist" />
            </div>
          </CardBox>
        )}
      </Section>

      <Section tone={usableGallery(h.slug).length > 0 ? "surface" : "plain"}>
        <SectionHeading eyebrow="Treatments" title="Treatment areas to explore" />
        <TreatmentChips items={h.specialties} />
      </Section>

      <Section tone={usableGallery(h.slug).length > 0 ? "plain" : "surface"}>
        <SectionHeading eyebrow="Location" title="Where to find the hospital" text={h.address} />
        <div className="overflow-hidden rounded-3xl border">
          <iframe
            title={`Map of ${h.name}`}
            src={mapEmbed}
            loading="lazy"
            className="h-80 w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 bg-background px-6 text-sm font-semibold text-primary hover:bg-accent"
          >
            <MapPin className="h-4 w-4" aria-hidden /> View on Google Maps
          </a>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 bg-background px-6 text-sm font-semibold text-primary hover:bg-accent"
          >
            <Navigation className="h-4 w-4" aria-hidden /> Get directions
          </a>
        </div>
      </Section>

      <Section tone={usableGallery(h.slug).length > 0 ? "surface" : "plain"}>
        <SectionHeading eyebrow="Other hospitals" title="Compare with other partner hospitals" />
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((x) => (
            <HospitalCard key={x.slug} h={x} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-primary">Planning care at {h.name}?</h2>
            <p className="mt-3 text-muted-foreground">
              Send your reports. A specialist reviews them and you receive a written plan and an
              estimate range before you decide.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">{INDEPENDENCE_NOTE}</p>
          </div>
          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}

function usableGallery(slug: string) {
  return (HOSPITAL_GALLERY[slug] ?? []).map(usableImage).filter(Boolean);
}

export function DoctorProfile({ d }: { d: Doctor }) {
  const h = hospitalBySlug(d.hospitalSlug);
  const colleagues = doctors
    .filter((x) => x.hospitalSlug === d.hospitalSlug && x.slug !== d.slug)
    .slice(0, 3);
  const details = [
    { label: "Qualifications", value: d.qualifications },
    { label: "Experience", value: d.experience },
    { label: "Languages", value: d.languages },
  ].filter((r) => r.value.trim());
  const treatmentSlug = treatmentSlugFor(`${d.speciality} ${d.focus.join(" ")}`);
  const treatment = treatments.find((t) => t.slug === treatmentSlug);

  return (
    <>
      <div className="border-b bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumb
            trail={
              <PageLink
                page="doctors"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> All doctors
              </PageLink>
            }
          />
          <div className="grid items-center gap-8 md:grid-cols-[320px_1fr]">
            <div className="mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-surface shadow-md md:mx-0">
              <SmartImage
                src={DOCTOR_PHOTO[d.slug]}
                alt={d.name}
                className="h-full w-full object-cover object-top"
                fallback={<DoctorInitials name={d.name} />}
              />
            </div>
            <div>
              <h1 className="text-balance text-4xl font-semibold leading-tight text-primary sm:text-5xl">
                {d.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-brand">{d.speciality}</p>
              <p className="mt-1 text-muted-foreground">
                {h ? (
                  <Link
                    to="/hospitals/$slug"
                    params={{ slug: h.slug }}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {h.name}
                  </Link>
                ) : (
                  d.hospital
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton
                  label="Request appointment"
                  message={`Hello Medibridge International, I'd like to request an appointment with ${d.name}.`}
                />
                <EnquiryButton variant="outline" label="Get a second opinion" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-primary">About</h2>
            <p className="mt-3 text-muted-foreground">{d.bio}</p>
            {d.focus.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand">
                  Focus areas
                </h3>
                <div className="mt-3">
                  <Tags items={d.focus} />
                </div>
              </>
            )}
            {treatment && (
              <p className="mt-6 text-sm text-muted-foreground">
                Related treatment area:{" "}
                <Link
                  to="/treatments/$slug"
                  params={{ slug: treatment.slug }}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {treatment.name}
                </Link>
              </p>
            )}
          </div>
          <CardBox>
            <h2 className="text-xl font-semibold text-primary">Details</h2>
            <dl className="mt-4 grid gap-4 text-sm">
              {details.map((r) => (
                <div key={r.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {r.label}
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">{r.value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Hospital</dt>
                <dd className="mt-0.5 font-medium text-foreground">{d.hospital}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-muted-foreground">{INDEPENDENCE_NOTE}</p>
          </CardBox>
        </div>
      </Section>

      {colleagues.length > 0 && (
        <Section tone="surface">
          <SectionHeading eyebrow="Same hospital" title={`More doctors at ${d.hospital}`} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colleagues.map((x) => (
              <DoctorCard key={x.slug} d={x} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Home page strip                                                     */
/* ------------------------------------------------------------------ */

export function FeaturedDoctors() {
  const list = featuredDoctorSlugs
    .map((s) => doctorBySlug(s))
    .filter((d): d is Doctor => Boolean(d));
  return (
    <Section>
      <SectionHeading
        eyebrow="Doctors"
        title="Specialists who review your case"
        text="A few of the specialists on our panel across partner hospitals."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((d) => (
          <DoctorCard key={d.slug} d={d} />
        ))}
      </div>
      <div className="mt-8">
        <PageLink page="doctors" className="text-sm font-semibold text-brand hover:underline">
          See all {doctors.length} doctors
        </PageLink>
      </div>
    </Section>
  );
}
