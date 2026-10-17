import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEnquiry } from "@/enquiry.functions";
import { supabase } from "@/integrations/supabase/client";
import { treatments } from "@/site-data";
import { PageLink } from "@/site-ui";

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; skipped: number }
  | { kind: "error"; message: string };

function safeName(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9._-]/g, "_").slice(-100);
  return cleaned.length > 0 ? cleaned : "report";
}

export function EnquiryForm({ defaultTreatment = "" }: { defaultTreatment?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  function onFiles(list: FileList | null) {
    setFileError("");
    const picked = Array.from(list ?? []);
    if (picked.length > MAX_FILES) {
      setFileError(`Please attach at most ${MAX_FILES} files.`);
      setFiles([]);
      return;
    }
    const bad = picked.find((f) => !ALLOWED.includes(f.type) || f.size > MAX_BYTES);
    if (bad) {
      setFileError("Files must be PDF, JPG or PNG and under 5 MB each.");
      setFiles([]);
      return;
    }
    setFiles(picked);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const text = (key: string) => String(fd.get(key) ?? "").trim();

    setStatus({ kind: "sending" });
    const id = crypto.randomUUID();

    // 1) Upload reports to private storage (optional). A failed upload never blocks the enquiry.
    const reportPaths: string[] = [];
    let skipped = 0;
    for (const file of files) {
      const path = `${id}/${crypto.randomUUID()}_${safeName(file.name)}`;
      try {
        const { error } = await supabase.storage
          .from("medical-reports")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error) skipped += 1;
        else reportPaths.push(path);
      } catch {
        skipped += 1;
      }
    }

    // 2) Save the enquiry through the server function (validated again on the server).
    try {
      await submitEnquiry({
        data: {
          id,
          fullName: text("fullName"),
          country: text("country"),
          phone: text("phone"),
          treatment: text("treatment"),
          message: text("message"),
          consent: true,
          reportPaths,
          website: text("website"),
        },
      });
      form.reset();
      setFiles([]);
      setStatus({ kind: "done", skipped });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not save your enquiry. Please check your details and try again.",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <div role="status" className="rounded-2xl border border-brand/30 bg-surface p-6 sm:p-8">
        <CheckCircle2 className="h-8 w-8 text-brand" aria-hidden />
        <h3 className="mt-3 text-xl font-semibold">Thank you, your enquiry is saved</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We have received your details and will use the phone number you gave to contact you.
        </p>
        {status.skipped > 0 && (
          <p className="mt-3 text-sm text-warning-foreground">
            {status.skipped} file{status.skipped > 1 ? "s" : ""} could not be attached. Please
            mention this when we contact you, so we can arrange another way to share it.
          </p>
        )}
        <Button className="mt-5" variant="outline" onClick={() => setStatus({ kind: "idle" })}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
      aria-describedby="enquiry-note"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            required
            minLength={2}
            maxLength={80}
            autoComplete="country-name"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Phone or WhatsApp (with country code)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            minLength={6}
            maxLength={30}
            pattern="[0-9+()\-\s.]+"
            title="Digits, spaces and + ( ) - only"
            autoComplete="tel"
            placeholder="+234 801 234 5678"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="treatment">Treatment or speciality</Label>
          <select
            id="treatment"
            name="treatment"
            required
            defaultValue={defaultTreatment}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select one
            </option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.name}>
                {t.name}
              </option>
            ))}
            <option value="Other or not sure">Other or not sure</option>
          </select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="message">Your question (optional)</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Tell us your diagnosis if you know it, what treatment you have had so far, and how many people will travel."
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="reports">Medical reports (optional)</Label>
        <label
          htmlFor="reports"
          className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-muted/50 px-3 py-3 text-sm text-muted-foreground hover:bg-muted"
        >
          <Paperclip className="h-4 w-4 shrink-0" aria-hidden />
          {files.length > 0
            ? files.map((f) => f.name).join(", ")
            : "Attach up to 3 files (PDF, JPG, PNG, 5 MB each)"}
        </label>
        <input
          id="reports"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
        {fileError && (
          <p role="alert" className="text-sm text-destructive">
            {fileError}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Reports are stored privately, not on a public page.
        </p>
      </div>

      {/* Honeypot field: hidden from people, visible to bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 accent-[var(--brand)]"
        />
        <span>
          I agree that Medibridge may store my details and reports to respond to this enquiry, as
          described in the{" "}
          <PageLink
            page="privacy"
            className="font-medium text-primary underline underline-offset-2"
          >
            privacy policy
          </PageLink>
          .
        </span>
      </label>

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {status.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={sending || !!fileError}
        className="h-11 w-full sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden /> Sending...
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
      <p id="enquiry-note" className="text-xs text-muted-foreground">
        This form is for planning care, not emergencies. In an emergency, contact your local
        emergency services.
      </p>
    </form>
  );
}
