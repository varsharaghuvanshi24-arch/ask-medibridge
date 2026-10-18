import { createFileRoute, notFound } from "@tanstack/react-router";

import { DoctorProfile } from "@/directory";
import { doctorBySlug, site } from "@/site-data";

export const Route = createFileRoute("/doctors/$slug")({
  beforeLoad: ({ params }) => {
    if (!doctorBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const d = doctorBySlug(params.slug);
    const title = d ? `${d.name}, ${d.speciality} | ${site.shortName}` : site.name;
    const description = d ? `${d.bio} ${d.hospital}.` : site.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      scripts: d
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Physician",
                name: d.name,
                description: d.bio,
                worksFor: { "@type": "Hospital", name: d.hospital },
              }),
            },
          ]
        : [],
    };
  },
  component: DoctorRoute,
});

function DoctorRoute() {
  const { slug } = Route.useParams();
  const d = doctorBySlug(slug);
  if (!d) return null;
  return <DoctorProfile d={d} />;
}
