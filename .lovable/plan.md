# Hospitals and doctors pages

## What will change
- Add centralized hospital, doctor, and photo-slot data, including the supplied profiles and available image links.
- Build hospital and doctor listings and detail pages with working links, filters, compare table, galleries, appointment/quote actions, and page-specific metadata.
- Update the existing home-page hospital and doctor features to use the same records.
- Preserve the existing shared navigation, footer, visual theme, dark/light mode, and animation wrapper.

## Technical details
- Use TanStack file routes for `/hospitals`, `/hospitals/$slug`, `/doctors`, and `/doctors/$slug`.
- Keep editable records in `src/data/hospitals.ts`, `src/data/doctors.ts`, and `src/data/media.ts`; update the existing home page and content renderer only where they currently display hospital/doctor content.
- Verify requested routes, representative interactions, data counts and mobile layout; do not alter unrelated pages or the shared site shell.
