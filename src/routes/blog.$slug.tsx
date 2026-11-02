import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SITE_URL, posts, seoTitle, site, trimDescription } from "@/site-data";
import { EnquiryButton, PageHero, PlaceholderNote, Section } from "@/site-ui";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!posts.some((p) => p.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const p = posts.find((x) => x.slug === params.slug);
    const title = p ? seoTitle(p.title) : site.name;
    const description = p ? trimDescription(p.summary) : site.description;
    const url = `${SITE_URL}/blog/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  return (
    <>
      <PageHero title={post.title} intro={post.summary} />
      <Section>
        <article className="max-w-2xl">
          <Link
            to="/$page"
            params={{ page: "blog" }}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All articles
          </Link>
          <PlaceholderNote>Sample article. Replace it with your own content.</PlaceholderNote>
          <div className="grid gap-5 text-base leading-relaxed text-muted-foreground">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            This article is general information, not medical advice.
          </p>
          <div className="mt-8">
            <EnquiryButton />
          </div>
        </article>
      </Section>
    </>
  );
}
