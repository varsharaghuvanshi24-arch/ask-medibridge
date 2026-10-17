import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { site } from "@/site-data";

/** Page-width wrapper used by every section. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  tone = "plain",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "plain" | "surface";
  children: ReactNode;
}) {
  return (
    <section
      {...(id ? { id } : {})}
      className={cn("scroll-mt-20 py-14 sm:py-20", tone === "surface" && "bg-surface", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-tight text-primary sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

/** Top-of-page banner for inner pages. */
export function PageHero({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="border-b bg-surface">
      <Container className="py-12 sm:py-16">
        <h1 className="text-balance text-4xl font-semibold leading-tight text-primary sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{intro}</p>
      </Container>
    </div>
  );
}

/** Visible marker for content the owner still has to supply. */
export function PlaceholderBadge({ label = "Placeholder" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-warning px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-warning-foreground">
      {label}
    </span>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl bg-warning px-4 py-3 text-sm text-warning-foreground">
      <PlaceholderBadge />
      <span>{children}</span>
    </div>
  );
}

export function CardBox({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border bg-card p-5 shadow-sm sm:p-6", className)}>
      {children}
    </div>
  );
}

/** Link to a top-level content page such as /treatments. */
export function PageLink({
  page,
  className,
  onClick,
  children,
}: {
  page: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link to="/$page" params={{ page }} className={className} {...(onClick ? { onClick } : {})}>
      {children}
    </Link>
  );
}

export function EnquiryButton({
  className,
  variant = "solid",
  label = "Send an enquiry",
}: {
  className?: string;
  variant?: "solid" | "outline";
  label?: string;
}) {
  return (
    <PageLink
      page="contact"
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-primary/30 bg-background text-primary hover:bg-accent",
        className,
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </PageLink>
  );
}

/** Contact value or a visible placeholder when the owner has not added it yet. */
export function ContactValue({ value, hint }: { value: string; hint: string }) {
  if (value) return <>{value}</>;
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <PlaceholderBadge />
      <span className="text-muted-foreground">{hint}</span>
    </span>
  );
}

export function phoneHref() {
  const digits = site.contact.phone.replace(/[^0-9+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export function whatsappHref() {
  const digits = site.contact.whatsapp.replace(/[^0-9]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}
