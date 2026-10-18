import { createFileRoute, notFound } from "@tanstack/react-router";

import { HospitalProfile } from "@/directory";
import { hospitalBySlug, site } from "@/site-data";

export const Route = createFileRoute("/hospitals/$slug")({
  beforeLoad: ({ params }) => {
    if (!hospitalBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const h = hospitalBySlug(params.slug);
    const title = h ? `${h.name} | ${site.shortName}` : site.name;
    const description = h ? `${h.summary} ${h.address}.` : site.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      scripts: h
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Hospital",
                name: h.name,
                description: h.summary,
                address: h.address,
              }),
            },
          ]
        : [],
    };
  },
  component: HospitalRoute,
});

function HospitalRoute() {
  const { slug } = Route.useParams();
  const h = hospitalBySlug(slug);
  if (!h) return null;
  return <HospitalProfile h={h} />;
}
