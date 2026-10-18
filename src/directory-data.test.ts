import { describe, expect, it } from "vitest";

import { DOCTOR_PHOTO, HOSPITAL_COVER, usableImage } from "@/media";
import { doctors, featuredDoctorSlugs, hospitals } from "@/site-data";

describe("Hospitals and doctors data", () => {
  it("lists 8 hospitals and 20 doctors with unique slugs", () => {
    expect(hospitals).toHaveLength(8);
    expect(doctors).toHaveLength(20);
    expect(new Set(hospitals.map((h) => h.slug)).size).toBe(8);
    expect(new Set(doctors.map((d) => d.slug)).size).toBe(20);
  });

  it("links every doctor to an existing hospital", () => {
    for (const d of doctors) {
      expect(
        hospitals.some((h) => h.slug === d.hospitalSlug),
        d.slug,
      ).toBe(true);
      expect(d.hospital).not.toBe("");
    }
  });

  it("only features doctors that exist", () => {
    for (const s of featuredDoctorSlugs)
      expect(
        doctors.some((d) => d.slug === s),
        s,
      ).toBe(true);
  });

  it("has photo slots only for real hospitals and doctors", () => {
    for (const k of Object.keys(HOSPITAL_COVER))
      expect(
        hospitals.some((h) => h.slug === k),
        k,
      ).toBe(true);
    for (const k of Object.keys(DOCTOR_PHOTO))
      expect(
        doctors.some((d) => d.slug === k),
        k,
      ).toBe(true);
  });

  it("never shows an ibb.co page link as a picture", () => {
    expect(usableImage("https://ibb.co/rf1TDKtP")).toBe("");
    expect(usableImage("https://i.ibb.co/abc/medanta.jpg")).toBe(
      "https://i.ibb.co/abc/medanta.jpg",
    );
    expect(usableImage("")).toBe("");
  });

  it("does not include excluded names", () => {
    const all = JSON.stringify([hospitals, doctors, DOCTOR_PHOTO]).toLowerCase();
    expect(all).not.toContain("jyoti");
    expect(all).not.toContain("cédar");
    expect(all).not.toContain("starex");
  });
});
