import { createFileRoute, notFound } from "@tanstack/react-router";

import { SITE_URL, pageMeta, site } from "@/site-data";
import { renderPage } from "@/site-pages";

// One route serves all top-level content pages (/about, /hospitals, /visa, ...).
// To add a page, add it to `pageMeta` in src/site-data.ts and to `renderPage` in src/site-pages.tsx.
export const Route = createFileRoute("/$page")({
  beforeLoad: ({ params }) => {
    if (!pageMeta[params.page]) throw notFound();
  },
  head: ({ params }) => {
    const meta = pageMeta[params.page];
    const title = meta?.title ?? site.name;
    const description = meta?.description ?? site.description;
    const url = `${SITE_URL}/${params.page}`;
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
  component: PageRoute,
});

function PageRoute() {
  const { page } = Route.useParams();
  return <>{renderPage(page)}</>;
}
