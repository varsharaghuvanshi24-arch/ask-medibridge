import { Link, createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Lock, UserRoundCheck } from "lucide-react";

import arrivalImg from "@/assets/medibridge-arrival.jpg";
import hospitalImg from "@/assets/medibridge-hospital.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnquiryForm } from "@/enquiry-form";
import { faqs, hospitals, site, treatments } from "@/site-data";
import { IntroVideo, Steps } from "@/site-pages";
import {
  CardBox,
  Container,
  ContactValue,
  EnquiryButton,
  PageLink,
  PlaceholderBadge,
  PlaceholderNote,
  Section,
  SectionHeading,
} from "@/site-ui";

// Title and description come from __root.tsx.
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <div className="bg-surface">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Medical travel to {site.destination}
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EnquiryButton label="Send your reports" />
              <PageLink
                page="treatments"
                className="inline-flex h-11 items-center justify-center rounded-full border border-primary/30 bg-background px-6 text-sm font-semibold text-primary hover:bg-accent"
              >
                Explore treatments
              </PageLink>
            </div>
          </div>
          <img
            src={arrivalImg}
            alt="A Medibridge coordinator welcoming a family at the airport"
            width={1600}
            height={1104}
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
        </Container>
      </div>

      {/* Trust points */}
      <Section className="py-10 sm:py-12">
        <ul className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Lock,
              title: "Private by design",
              text: "Reports you attach go to private storage, never to a public page.",
            },
            {
              icon: UserRoundCheck,
              title: "One coordinator",
              text: "A single point of contact from your first enquiry to follow-up.",
            },
            {
              icon: FileCheck2,
              title: "Written plan and estimate",
              text: "Compare a clear plan and estimate range before you decide.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-sans text-base font-semibold text-primary">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Journey */}
      <Section tone="surface" id="how-it-works">
        <SectionHeading
          eyebrow="How it works"
          title="Six steps from your first enquiry to follow-up"
          text="We keep each step clear so you always know what happens next."
        />
        <Steps />
      </Section>

      {/* Treatments */}
      <Section id="treatments">
        <SectionHeading
          eyebrow="Treatments"
          title="Specialities we can help you explore"
          text="Select a speciality to see what we help with and which reports to prepare."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.slice(0, 6).map((t) => (
            <Link key={t.slug} to="/treatments/$slug" params={{ slug: t.slug }} className="group">
              <CardBox className="h-full transition-shadow group-hover:shadow-md">
                <h3 className="text-lg font-semibold text-primary">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
              </CardBox>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <PageLink page="treatments" className="text-sm font-semibold text-brand hover:underline">
            See all {treatments.length} specialities
          </PageLink>
        </div>
      </Section>

      {/* Hospitals */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Hospitals"
          title="Hospitals and doctors, compared with you"
          text="Your coordinator shares options that fit your treatment plan and budget."
        />
        <PlaceholderNote>
          Partner hospital details are placeholders. Edit <code>hospitals</code> in{" "}
          <code>src/site-data.ts</code>.
        </PlaceholderNote>
        <div className="grid items-start gap-5 md:grid-cols-[1.1fr_1fr]">
          <img
            src={hospitalImg}
            alt="A bright hospital corridor with a doctor and a coordinator walking together"
            width={1600}
            height={1104}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
          />
          <ul className="grid gap-3">
            {hospitals.slice(0, 3).map((h) => (
              <li key={h.name}>
                <CardBox className="p-4 sm:p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-primary">{h.name}</h3>
                    {h.placeholder && <PlaceholderBadge />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{h.specialties.join(", ")}</p>
                </CardBox>
              </li>
            ))}
            <li>
              <PageLink
                page="hospitals"
                className="text-sm font-semibold text-brand hover:underline"
              >
                View hospitals
              </PageLink>
            </li>
          </ul>
        </div>
      </Section>

      {/* Estimates */}
      <Section>
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
            Know the likely cost before you travel
          </h2>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            After a specialist reviews your reports, you receive a written treatment plan with an
            estimate range. Costs depend on your diagnosis, the hospital, room type and length of
            stay, so we do not publish one price for everyone.
          </p>
          <div className="mt-7">
            <EnquiryButton
              variant="outline"
              label="Request an estimate"
              className="border-transparent"
            />
          </div>
        </div>
      </Section>

      {/* Video */}
      <Section tone="surface">
        <SectionHeading eyebrow="Introduction" title={`Meet ${site.shortName}`} />
        <div className="mx-auto max-w-4xl">
          <IntroVideo />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeading eyebrow="FAQ" title="Questions patients often ask" />
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Enquiry */}
      <Section tone="surface" id="enquiry">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Enquiry"
              title="Tell us about your case"
              text="Share your details and, if you can, your reports. A coordinator will contact you using the phone number you give."
            />
            <ul className="grid gap-3 text-sm text-muted-foreground">
              <li>
                <span className="font-semibold text-primary">Email: </span>
                <ContactValue value={site.contact.email} hint="to be added" />
              </li>
              <li>
                <span className="font-semibold text-primary">Phone: </span>
                <ContactValue value={site.contact.phone} hint="to be added" />
              </li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
