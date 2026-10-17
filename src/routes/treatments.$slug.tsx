import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";

import { EnquiryForm } from "@/enquiry-form";
import { site, treatments } from "@/site-data";
import { CardBox, PageHero, Section } from "@/site-ui";

export const Route = createFileRoute("/treatments/$slug")({
  beforeLoad: ({ params }) => {
    if (!treatments.some((t) => t.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const t = treatments.find((x) => x.slug === params.slug);
    const title = t ? `${t.name} | ${site.shortName}` : site.name;
    const description = t?.summary ?? site.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
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
