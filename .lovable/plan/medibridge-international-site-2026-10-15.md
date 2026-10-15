# Medibridge International site

## Goal
Replace the starter screen with a polished, responsive English-language medical-travel website using the supplied brief and attached introduction video.

## Build
- Create a brand-led home page with hero imagery, service journey, hospital and specialty highlights, treatment estimates, video, FAQ, enquiry form, and contact details.
- Add separate navigable pages for the brief’s primary content, hospital/doctor directories, treatment categories and details, consultation, visa, services, gallery, blogs, and legal information, with page-specific metadata.
- Add shared navigation, mobile actions, footer, a lightweight FAQ-guided assistant, consent notice, and reusable contact/enquiry presentation.
- Store hospital, doctor, treatment, and media content in editable data modules; preserve visibly marked placeholders where client information is missing.
- Use Lovable Cloud for private lead storage. Do not expose lead reads or unlock the private inbox until the shared password is supplied securely. Do not claim email delivery until sender setup exists.

## Technical details
- Use TanStack Start file-based routes and semantic Tailwind design tokens; keep server-only secrets and database writes behind server functions.
- Create a narrowly scoped leads table that accepts public enquiries but does not permit public reads; validate submissions server-side.
- Keep uploaded medical reports out of public storage. Use the supplied video as the introduction video and generate suitable visual assets for the public pages.
- Verify the home page, representative routes, enquiry submission, and mobile navigation after implementation.
