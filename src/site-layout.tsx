import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, Moon, Phone, Sun, X, FileText } from "lucide-react";
import { useEffect, useState } from "react";

import markUrl from "@/assets/medibridge-mark.png";
import { Assistant } from "@/assistant";
import { ScrollReveal } from "@/scroll-reveal";
import { legalNav, primaryNav, secondaryNav, site } from "@/site-data";
import { Container, EnquiryButton, PageLink, phoneHref, whatsappHref } from "@/site-ui";

const NOTICE_KEY = "medibridge-notice-v1";
const THEME_KEY = "medibridge-theme";

/** Slim notice about how enquiry data and reports are handled. */
function ConsentNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(NOTICE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(NOTICE_KEY, "1");
    } catch {
      /* storage can be blocked; the notice just returns next visit */
    }
    setVisible(false);
  }

  return (
    <div role="region" aria-label="Privacy notice" className="bg-primary text-primary-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5 text-xs sm:text-sm">
        <p className="max-w-3xl">
          Enquiries and any reports you attach are stored privately and used only to respond to you.{" "}
          <PageLink page="privacy" className="font-semibold underline underline-offset-2">
            Read the privacy policy
          </PageLink>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full bg-primary-foreground/15 px-3 py-1 font-semibold hover:bg-primary-foreground/25"
        >
          Got it
        </button>
      </Container>
    </div>
  );
}

/** Light / dark switch. Remembers the choice; first visit follows the phone's setting. */
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      /* storage can be blocked; fall back to the device setting */
    }
    const isDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* the choice just won't be remembered */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-accent"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <img src={markUrl} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      <span className="font-display text-lg font-semibold leading-none text-primary">
        {site.shortName}
        <span className="block text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-brand">
          International
        </span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const all = [...primaryNav, ...secondaryNav];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <PageLink
              key={item.slug}
              page={item.slug}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-primary"
            >
              {item.label}
            </PageLink>
          ))}
          <PageLink
            page="blog"
            className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-primary"
          >
            Blog
          </PageLink>
          <PageLink
            page="contact"
            className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-primary"
          >
            Contact
          </PageLink>
        </nav>
        <div className="flex items-center gap-2">
          <EnquiryButton className="hidden h-10 sm:inline-flex" label="Enquire now" />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t bg-background lg:hidden">
          <Container className="grid gap-1 py-3">
            {all.map((item) => (
              <PageLink
                key={item.slug}
                page={item.slug}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </PageLink>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 pb-28 md:grid-cols-[1.4fr_1fr_1fr] md:pb-12">
        <div>
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/75">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-xs text-primary-foreground/60">
            Medibridge coordinates care. It does not provide medical advice or treatment.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
            Explore
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            {[...primaryNav, ...secondaryNav].map((item) => (
              <li key={item.slug}>
                <PageLink page={item.slug} className="text-primary-foreground/85 hover:underline">
                  {item.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
            Contact
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-primary-foreground/85">
            <li>{site.contact.email || "Email: to be added"}</li>
            <li>{site.contact.phone || "Phone: to be added"}</li>
            <li>
              <PageLink page="contact" className="underline underline-offset-2">
                Send an enquiry
              </PageLink>
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
            Legal
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            {legalNav.map((item) => (
              <li key={item.slug}>
                <PageLink page={item.slug} className="text-primary-foreground/85 hover:underline">
                  {item.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs text-primary-foreground/60">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}

/** Sticky call / WhatsApp / enquire bar for phones. */
function MobileActions() {
  const phone = phoneHref();
  const wa = whatsappHref();
  const base =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-primary";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background/95 backdrop-blur md:hidden">
      {phone ? (
        <a href={phone} className={base}>
          <Phone className="h-5 w-5" aria-hidden /> Call
        </a>
      ) : null}
      {wa ? (
        <a href={wa} className={base} target="_blank" rel="noreferrer">
          <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp
        </a>
      ) : null}
      <PageLink page="contact" className={base}>
        <FileText className="h-5 w-5" aria-hidden /> Enquire
      </PageLink>
    </div>
  );
}

/** Floating WhatsApp button, bottom right. Sits above the assistant button. */
function WhatsAppFloat() {
  const wa = whatsappHref();
  if (!wa) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-36 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5b] md:bottom-24 md:right-6"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}

/** Shared page frame: notice, header, page content, footer, mobile bar and assistant. */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <ConsentNotice />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileActions />
      <WhatsAppFloat />
      <Assistant />
      <ScrollReveal />
    </div>
  );
}
