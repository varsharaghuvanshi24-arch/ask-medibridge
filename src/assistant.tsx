import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { faqs } from "@/site-data";
import { PageLink } from "@/site-ui";

type Msg = { from: "bot" | "me"; text: string; showContact?: boolean };

const EMERGENCY =
  /emergency|chest pain|can't breathe|cannot breathe|bleeding|suicid|overdose|unconscious/i;

function answer(input: string): Msg {
  if (EMERGENCY.test(input)) {
    return {
      from: "bot",
      text: "This sounds urgent. Please contact your local emergency services or go to the nearest hospital now. This website cannot help with emergencies.",
    };
  }

  const words = input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  let best: { score: number; text: string } = { score: 0, text: "" };
  for (const faq of faqs) {
    const score = faq.keywords.reduce((n, k) => n + (words.includes(k) ? 1 : 0), 0);
    if (score > best.score) best = { score, text: faq.a };
  }

  if (best.score > 0) return { from: "bot", text: best.text };

  return {
    from: "bot",
    text: "I can answer common questions about the process, documents, costs, privacy and visas. For anything else, please send an enquiry and a coordinator will respond.",
    showContact: true,
  };
}

/** Small FAQ-guided helper. Runs in the browser only; messages are not stored. */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hello, I am the Medibridge assistant. Choose a question below or type your own. I cannot give medical advice.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  function ask(q: string) {
    const clean = q.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "me", text: clean }, answer(clean)]);
    setText("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(text);
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-lg hover:opacity-95 md:bottom-6 md:right-6"
          aria-label="Open the Medibridge assistant"
        >
          <MessageCircle className="h-5 w-5" aria-hidden /> Ask
        </button>
      )}

      {open && (
        <section
          role="dialog"
          aria-label="Medibridge assistant"
          className="fixed inset-x-3 bottom-20 z-50 flex max-h-[75vh] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl sm:left-auto sm:right-6 sm:w-96 md:bottom-6"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="text-sm font-semibold">Medibridge assistant</p>
              <p className="text-xs text-primary-foreground/70">
                Not medical advice. Chat is not saved.
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.from === "me"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2"
                  }
                >
                  {m.text}
                  {m.showContact && (
                    <PageLink
                      page="contact"
                      className="mt-2 block font-semibold text-primary underline"
                    >
                      Send an enquiry
                    </PageLink>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-1.5 border-t px-3 py-2">
            {faqs.slice(0, 4).map((f) => (
              <button
                key={f.q}
                type="button"
                onClick={() => ask(f.q)}
                className="rounded-full border bg-surface px-2.5 py-1 text-xs text-primary hover:bg-accent"
              >
                {f.q}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your question"
              maxLength={200}
              aria-label="Your question"
              className="h-10 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
