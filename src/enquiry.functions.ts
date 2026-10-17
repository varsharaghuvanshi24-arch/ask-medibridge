import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Must match the storage policy in drizzle/migrations/0001_*.sql
const REPORT_PATH = /^[0-9a-f-]{36}\/[0-9a-f-]{36}_[A-Za-z0-9._-]{1,120}$/;

export const enquirySchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(30)
    .regex(/^[0-9+()\-\s.]+$/),
  treatment: z.string().trim().min(2).max(120),
  message: z.string().trim().max(2000),
  consent: z.literal(true),
  reportPaths: z.array(z.string().max(200)).max(3),
  // Honeypot: real visitors never fill this in.
  website: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator(enquirySchema)
  .handler(async ({ data }) => {
    if (data.website) {
      // Looks like a bot: pretend it worked, store nothing.
      return { ok: true as const };
    }

    const paths = data.reportPaths.filter(
      (p) => REPORT_PATH.test(p) && p.startsWith(`${data.id}/`),
    );

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("medibridge_enquiries").insert({
      id: data.id,
      full_name: data.fullName,
      country: data.country,
      phone: data.phone,
      treatment: data.treatment,
      message: data.message,
      consent: true,
      report_paths: paths.length > 0 ? paths : null,
    });

    if (error) {
      console.error("[enquiry] insert failed", error.message);
      throw new Error("Could not save the enquiry");
    }

    return { ok: true as const };
  });
