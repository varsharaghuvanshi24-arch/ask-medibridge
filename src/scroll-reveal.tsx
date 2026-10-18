import { useEffect } from "react";

import "@/motion.css";

/**
 * Fades sections in as they scroll into view, and staggers the cards inside them.
 * It only touches things that start below the fold, so the top of every page shows
 * instantly. Renders nothing; add <ScrollReveal /> once in the site layout.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          // Hand control back to the element's own hover transitions afterwards.
          window.setTimeout(() => {
            el.classList.remove("reveal", "reveal-fade", "reveal-item", "is-visible");
            el.style.removeProperty("--reveal-delay");
          }, 1500);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    function prepare(el: HTMLElement, cls: string, delay = 0) {
      if (seen.has(el)) return;
      seen.add(el);
      // Already on screen: leave it alone so nothing flashes.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.classList.add(cls);
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
      io.observe(el);
    }

    function scan() {
      let blocks = Array.from(document.querySelectorAll<HTMLElement>("main section"));
      if (blocks.length === 0) {
        blocks = Array.from(document.querySelectorAll<HTMLElement>("main > *")).slice(1);
      }
      for (const block of blocks) {
        const grids = Array.from(block.querySelectorAll<HTMLElement>(".grid")).filter((g) => {
          const outer = g.parentElement?.closest(".grid");
          return !outer || !block.contains(outer);
        });
        const items = grids.flatMap((g) => Array.from(g.children) as HTMLElement[]);
        if (items.length > 1) {
          prepare(block, "reveal-fade");
          items.forEach((item, i) => prepare(item, "reveal-item", (i % 4) * 90));
        } else {
          prepare(block, "reveal");
        }
      }
    }

    let frame = 0;
    function scheduleScan() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    }

    scan();

    // Pages change without a reload, so look again whenever the page content changes.
    const main = document.getElementById("main");
    const mo = main ? new MutationObserver(scheduleScan) : null;
    if (main && mo) mo.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo?.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
