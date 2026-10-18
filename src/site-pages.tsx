import { Link } from "@tanstack/react-router";
import { Check, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import arrivalImg from "@/assets/medibridge-arrival.jpg";
import consultationImg from "@/assets/medibridge-consultation.jpg";
import hospitalImg from "@/assets/medibridge-hospital.jpg";
import posterImg from "@/assets/medibridge-intro-poster.jpg";
import { DoctorsPage, HospitalsPage } from "@/directory";
import { EnquiryForm } from "@/enquiry-form";
import {
  doctors,
  hospitals,
  journey,
  legalNav,
  pageMeta,
  posts,
  privacySections,
  services,
  site,
  termsSections,
  treatments,
  visaChecklist,
  visaSteps,
} from "@/site-data";
import {
  CardBox,
  ContactValue,
  EnquiryButton,
  PageHero,
  PlaceholderBadge,
  PlaceholderNote,
  Section,
  phoneHref,
  whatsappHref,
} from "@/site-ui";

function Page({ slug, children }: { slug: string; children: ReactNode }) {
  const meta = pageMeta[slug];
  return (
    <>
      <PageHero title={meta?.title ?? site.name} intro={meta?.description ?? ""} />
      {children}
    </>
  );
}

function About() {
  return (
    <Page slug="about">
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4 text-base text-muted-foreground">
            <p>
              {site.name} helps patients from other countries find the right hospital and doctor in{" "}
              {site.destination}. One coordinator guides you from the first enquiry to follow-up
              after you return home.
            </p>
            <p>
              We organise your reports, arrange specialist opinions, share a written plan and
              estimate, and help with visa documents, arrival and your stay.
            </p>
            <p>
              We are a coordination service. Medical opinions and treatment decisions always come
              from qualified doctors.
            </p>
            <div className="pt-2">
              <EnquiryButton />
            </div>
          </div>
          <img
            src={consultationImg}
            alt="A doctor listening to a patient during a consultation"
            width={1920}
            height={1200}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
          />
        </div>
      </Section>
      <Section tone="surface">
        <h2 className="mb-8 text-3xl font-semibold text-primary">How we work</h2>
        <Steps />
      </Section>
    </Page>
  );
}

export function Steps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {journey.map((step, i) => (
        <li key={step.title}>
          <CardBox className="h-full">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-primary">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
          </CardBox>
        </li>
      ))}
    </ol>
  );
}

function Treatments() {
  return (
    <Page slug="treatments">
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <Link key={t.slug} to="/treatments/$slug" params={{ slug: t.slug }} className="group">
              <CardBox className="h-full transition-shadow group-hover:shadow-md">
                <h3 className="text-lg font-semibold text-primary">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
                <p className="mt-4 text-sm font-semibold text-brand group-hover:underline">
                  View details
                </p>
              </CardBox>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Not sure which speciality fits? Choose &ldquo;Other or not sure&rdquo; on the enquiry form
          and a coordinator will help.
        </p>
      </Section>
    </Page>
  );
}

function Services() {
  return (
    <Page slug="services">
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <CardBox key={s.title}>
              <Check className="h-6 w-6 text-brand" aria-hidden />
              <h3 className="mt-3 text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
            </CardBox>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-lg text-primary">
            Tell us what you need and we will explain which services apply to your case.
          </p>
          <EnquiryButton />
        </div>
      </Section>
    </Page>
  );
}

function Consultation() {
  return (
    <Page slug="consultation">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-primary">How a consultation works</h2>
            <ol className="mt-5 grid gap-4 text-sm text-muted-foreground">
              {[
                "Send your enquiry with recent reports and your main question.",
                "A coordinator checks that your file is complete and contacts you if anything is missing.",
                "A specialist reviews your reports and prepares an opinion.",
                "You receive the opinion with a treatment plan and an estimate range, and decide what to do next.",
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{t}</span>
                </li>
              ))}
            </ol>
            <img
              src={consultationImg}
              alt="A doctor in conversation with a patient"
              width={1920}
              height={1200}
              loading="lazy"
              className="mt-8 hidden aspect-[4/3] w-full rounded-3xl object-cover shadow-md lg:block"
            />
          </div>
          <EnquiryForm />
        </div>
      </Section>
    </Page>
  );
}

function Visa() {
  return (
    <Page slug="visa">
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Steps to plan your visa</h2>
            <ol className="mt-5 grid gap-4 text-sm text-muted-foreground">
              {visaSteps.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary">Document checklist</h2>
            <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
              {visaChecklist.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-surface p-4 text-sm text-muted-foreground">
              Visa rules, fees and processing times are set by the government and change often.
              Always confirm the current requirements on the official website or with your nearest
              embassy or consulate. Medibridge cannot guarantee a visa.
            </p>
          </div>
        </div>
      </Section>
    </Page>
  );
}

function Gallery() {
  const items = [
    {
      src: hospitalImg,
      alt: "A bright hospital corridor with a doctor and coordinator walking together",
      w: 1600,
      h: 1104,
    },
    {
      src: consultationImg,
      alt: "A doctor speaking with a patient in a consultation room",
      w: 1920,
      h: 1200,
    },
    {
      src: arrivalImg,
      alt: "A coordinator welcoming a family at the airport on arrival",
      w: 1600,
      h: 1104,
    },
  ];
  return (
    <Page slug="gallery">
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <figure key={it.alt} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img
                src={it.src}
                alt={it.alt}
                width={it.w}
                height={it.h}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-4 text-sm text-muted-foreground">{it.alt}</figcaption>
            </figure>
          ))}
        </div>
        <h2 className="mb-5 mt-14 text-2xl font-semibold text-primary">Introduction video</h2>
        <IntroVideo />
      </Section>
    </Page>
  );
}

export function IntroVideo() {
  return (
    <video
      controls
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterImg}
      className="aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-md"
    >
      <source
        src="/__l5e/assets-v1/3eb34765-d38b-4f0b-9c36-498393903f1d/medibridge-introduction.mp4"
        type="video/mp4"
      />
      Your browser cannot play this video.
    </video>
  );
}

function Blog() {
  return (
    <Page slug="blog">
      <Section>
        <PlaceholderNote>
          These are sample articles. Replace them with your own in <code>posts</code> inside{" "}
          <code>src/site-data.ts</code>.
        </PlaceholderNote>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <CardBox className="h-full transition-shadow group-hover:shadow-md">
                <p className="text-xs font-medium text-brand">
                  {new Date(p.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                <p className="mt-4 text-sm font-semibold text-brand group-hover:underline">
                  Read article
                </p>
              </CardBox>
            </Link>
          ))}
        </div>
      </Section>
    </Page>
  );
}

/** Google Maps embed for the office address in site.contact.address. */
export function OfficeMap({ compact = false }: { compact?: boolean }) {
  const q = site.contact.address;
  if (!q) return null;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
  return (
    <div className={compact ? "" : "mt-10"}>
      {!compact && (
        <>
          <h2 className="text-xl font-semibold text-primary">Find us</h2>
          <p className="mt-1 text-sm text-muted-foreground">{q}</p>
        </>
      )}
      <div className={`${compact ? "" : "mt-4 "}overflow-hidden rounded-2xl border`}>
        <iframe
          title="Medibridge office on Google Maps"
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-72 w-full border-0 sm:h-96"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={directions}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          <MapPin className="h-4 w-4" aria-hidden /> Get directions
        </a>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border px-5 text-sm font-semibold text-primary"
        >
          Open in Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

function Contact() {
  const phone = phoneHref();
  const wa = whatsappHref();
  return (
    <Page slug="contact">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid content-start gap-5">
            <CardBox>
              <h2 className="text-xl font-semibold text-primary">Contact details</h2>
              <ul className="mt-4 grid gap-4 text-sm">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <ContactValue
                    value={site.contact.email}
                    hint="Add your email in src/site-data.ts"
                  />
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <ContactValue
                    value={site.contact.phone}
                    hint="Add your phone in src/site-data.ts"
                  />
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <ContactValue
                    value={site.contact.address}
                    hint="Add your address in src/site-data.ts"
                  />
                </li>
              </ul>
              {(phone || wa) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {phone && (
                    <a
                      href={phone}
                      className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                    >
                      Call now
                    </a>
                  )}
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-full border px-5 text-sm font-semibold text-primary"
                    >
                      WhatsApp <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              )}
            </CardBox>
            <p className="text-sm text-muted-foreground">
              Use the form to send your details and reports. Please do not use it for emergencies.
            </p>
          </div>
          <EnquiryForm />
        </div>
        <OfficeMap />
      </Section>
    </Page>
  );
}

function Legal({ slug, sections }: { slug: string; sections: { title: string; text: string }[] }) {
  return (
    <Page slug={slug}>
      <Section>
        <div className="max-w-3xl">
          <PlaceholderNote>
            This is draft text. Have it reviewed by a qualified professional before relying on it.
          </PlaceholderNote>
          <div className="grid gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-semibold text-primary">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            See also:{" "}
            {legalNav
              .filter((l) => l.slug !== slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  to="/$page"
                  params={{ page: l.slug }}
                  className="font-medium text-primary underline underline-offset-2"
                >
                  {l.label}
                </Link>
              ))}
          </p>
        </div>
      </Section>
    </Page>
  );
}

/** Renders the right body for a top-level page slug, or null when the slug is unknown. */
export function renderPage(slug: string): ReactNode {
  switch (slug) {
    case "about":
      return <About />;
    case "hospitals":
      return <HospitalsPage />;
    case "doctors":
      return <DoctorsPage />;
    case "treatments":
      return <Treatments />;
    case "services":
      return <Services />;
    case "consultation":
      return <Consultation />;
    case "visa":
      return <Visa />;
    case "gallery":
      return <Gallery />;
    case "blog":
      return <Blog />;
    case "contact":
      return <Contact />;
    case "privacy":
      return <Legal slug="privacy" sections={privacySections} />;
    case "terms":
      return <Legal slug="terms" sections={termsSections} />;
    default:
      return null;
  }
}
