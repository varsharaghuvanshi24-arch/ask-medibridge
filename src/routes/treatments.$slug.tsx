import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";

import { EnquiryForm } from "@/enquiry-form";
import { SITE_URL, seoTitle, site, treatments } from "@/site-data";
import { CardBox, PageHero, Section } from "@/site-ui";

// Copy-paste SEO titles for the priority treatment pages (user-supplied).
const treatmentSeo: Record<string, { title: string; description: string }> = {
  cardiology: {
    title: "Cardiology & Heart Surgery in India - Cost Estimate | Medibridge",
    description:
      "Get a cardiology second opinion and heart surgery cost estimate in India. Share your reports and receive a written treatment plan from Medibridge.",
  },
  orthopaedics: {
    title: "Hip & Knee Replacement in India - Cost & Best Hospitals | Medibridge",
    description:
      "Plan hip or knee replacement surgery in India with Medibridge. Compare leading hospitals and receive a written cost estimate before you travel.",
  },
  oncology: {
    title: "Cancer Treatment in India - Oncology Opinion & Cost | Medibridge",
    description:
      "Get an oncology second opinion and cancer treatment cost estimate in India, with a written plan coordinated by Medibridge International.",
  },
};

export const Route = createFileRoute("/treatments/$slug")({
  beforeLoad: ({ params }) => {
    if (!treatments.some((t) => t.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const t = treatments.find((x) => x.slug === params.slug);
    const override = treatmentSeo[params.slug];
    const title = override?.title ?? seoTitle(t?.name ?? site.name);
    const description = override?.description ?? t?.summary ?? site.description;
    const url = `${SITE_URL}/treatments/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TreatmentDetail,
});

function TreatmentDetail() {
  const { slug } = Route.useParams();
  const t = treatments.find((x) => x.slug === slug);
  if (!t) return null;

  return (
    <>
      <PageHero title={t.name} intro={t.summary} />
      <Section>
        <Link
          to="/$page"
          params={{ page: "treatments" }}
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All treatments
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid content-start gap-5">
            <CardBox>
              <h2 className="text-xl font-semibold text-primary">How we help</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {t.helps.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </CardBox>
            <CardBox>
              <h2 className="text-xl font-semibold text-primary">What to send</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {t.send.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </CardBox>
            <CardBox>
              <h2 className="text-xl font-semibold text-primary">Estimate</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The cost depends on your diagnosis, the hospital, room type and length of stay.
                After your reports are reviewed, you receive a written estimate range. No estimate
                is given before your reports are reviewed.
              </p>
            </CardBox>
          </div>
          <EnquiryForm defaultTreatment={t.name} />
        </div>
      </Section>
    </>
  );
}
