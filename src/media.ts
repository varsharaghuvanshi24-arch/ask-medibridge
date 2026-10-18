/**
 * PHOTOS FOR HOSPITALS AND DOCTORS.
 *
 * Easiest way: upload the pictures into these GitHub folders. The FILE NAME must be
 * the slug (see the list in each section below), for example:
 *
 *   src/assets/doctors/ashok-seth.jpg      -> photo of Dr. Ashok Seth
 *   src/assets/hospitals/blk-max.jpg       -> cover photo of BLK-Max
 *
 * Supported: .jpg .jpeg .png .webp (not .heic).
 * A picture in the folder wins over any link written below.
 *
 * Optional: paste IMGBB *direct* links (they start with https://i.ibb.co/) between the quotes.
 * An https://ibb.co/... page link is not a picture and is skipped.
 *
 * Until a picture exists, the site shows a clean placeholder (a coloured tile for
 * hospitals, initials for doctors), so nothing looks broken.
 */

type Files = Record<string, string>;

/** Turns /src/assets/doctors/ashok-seth.jpg into { "ashok-seth": url }. */
function bySlug(files: Files): Files {
  const out: Files = {};
  for (const [path, url] of Object.entries(files)) {
    const name = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "").toLowerCase();
    if (name) out[name] = url;
  }
  return out;
}

const doctorFiles = import.meta.glob("/src/assets/doctors/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Files;

const hospitalFiles = import.meta.glob(
  "/src/assets/hospitals/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
) as Files;

// Hospital cover photo, by hospital slug.
// Slugs: fortis-memorial, medanta, artemis, paras, shalby, ck-birla, max-saket, blk-max
const HOSPITAL_COVER_LINKS: Record<string, string> = {
  "fortis-memorial": "https://i.ibb.co/H1V8wJL/IMG-669d76b5-80e0-4350-a1ed-cf744fc35422.jpg",
  medanta: "https://i.ibb.co/cX7M4Kv5/IMG-b6f8602e-58e9-4f06-9b26-11a966a9bf16.jpg",
  artemis: "https://i.ibb.co/sd23v1Qz/6405e2d234ec8.webp",
  paras: "https://i.ibb.co/JWV5w7Gc/IMG-41b4e2ea-5d69-4817-960a-3fd246559afa.jpg",
  shalby: "https://i.ibb.co/dsmDksGc/IMG-309eb787-fcd7-4c0c-b51d-7cd670fba414.jpg",
  "ck-birla": "https://i.ibb.co/v4pD1dY7/IMG-21c83bd9-56aa-4ac5-9342-e33ccfe5059c.jpg",
  "max-saket": "https://i.ibb.co/qL83MHNs/IMG-df0ea844-efb3-42e1-8d20-0a5ae097b826.jpg",
};

// Extra hospital photos (shown as a gallery on the hospital page). Optional.
// Example: medanta: ["https://i.ibb.co/xxxx/lobby.jpg", "https://i.ibb.co/yyyy/icu.jpg"],
export const HOSPITAL_GALLERY: Record<string, string[]> = {
  "fortis-memorial": [],
  medanta: [],
  artemis: [],
  paras: [],
  shalby: [],
  "ck-birla": [],
  "max-saket": [],
  "blk-max": [],
};

// Doctor photo links (optional). Slugs for the file names:
// ashok-seth, rahul-bhargava, rama-joshi, rana-patir, vivek-vij, praveer-agarwal,
// sandeep-vaishya, naresh-trehan, a-s-soin, rajesh-ahlawat, ashok-rajgopal,
// yugal-kishore-mishra, neelam-mohan, sushila-kataria, ashok-vaid, subhash-chandra,
// sanjay-gogoi, aman-priya-khanna, manish-vaish, manisha-singh
const DOCTOR_PHOTO_LINKS: Record<string, string> = {
  "ashok-seth": "https://i.ibb.co/nMdt9GhH/dr-ashok-seth-2e2-Hu-E7-W.jpg",
  "rahul-bhargava": "https://i.ibb.co/svHZF1Pj/dr-rahul-bhargava-Boen-CYv-O.jpg",
  "rama-joshi": "https://i.ibb.co/jkNgBM00/dr-rama-joshi-Bi-YFOt0l.jpg",
  "rana-patir": "https://i.ibb.co/1BXf13t/d-R-Rana-Patir.jpg",
  "vivek-vij": "https://i.ibb.co/3Ycj3kn4/DR-VIVEK-VIJ.jpg",
  "praveer-agarwal": "https://i.ibb.co/chgWLbKR/dr-praveer-agarwal.jpg",
  "naresh-trehan": "https://i.ibb.co/My3CcKwD/dr-naresh-trehan-CED02x-X8.jpg",
  "ashok-rajgopal": "https://i.ibb.co/mFGXMrgB/dr-ashok-rajgopal-Rc-Pi59-Ho.png",
  "yugal-kishore-mishra": "https://i.ibb.co/Kcpg8Qjr/dr-yugal-kishore-mishra.jpg",
  "neelam-mohan": "https://i.ibb.co/fdPTG25c/dr-NEELAM-MOHAN.jpg",
  "sushila-kataria": "https://i.ibb.co/nNnLD83r/dr-SUSHILA-KATARIA.jpg",
  "ashok-vaid": "https://i.ibb.co/DPKhGBJV/dr-ashok-vaid-7c99tuk.webp",
  "subhash-chandra": "https://i.ibb.co/GQCxDrRD/dr-subhash-chandra-ez-Bi-Tfgh.jpg",
  "sanjay-gogoi": "https://i.ibb.co/Vcz76HfX/Dr-Sanjay-Gogoi.jpg",
  "aman-priya-khanna": "https://i.ibb.co/KjWSGgCV/dr-AMAN-PRIYA-KHANNA.jpg",
  "manish-vaish": "https://i.ibb.co/v61zKkG1/dr-manish-vaish.jpg",
  "manisha-singh": "https://i.ibb.co/4Z0SmCJ4/dr-MANISHA-SINGH.jpg",
"rajesh-ahlawat": "https://i.ibb.co/.../dr-rajesh-ahlawat.jpg",
"a-s-soin": "https://i.ibb.co/.../dr-a-s-soin.jpg",
"sandeep-vaishya": "https://i.ibb.co/.../dr-sandeep-vaishya.jpg",
};

export const HOSPITAL_COVER: Record<string, string> = {
  ...HOSPITAL_COVER_LINKS,
  ...bySlug(hospitalFiles),
};

export const DOCTOR_PHOTO: Record<string, string> = {
  ...DOCTOR_PHOTO_LINKS,
  ...bySlug(doctorFiles),
};

const VIEWER_LINK = /^https?:\/\/(www\.)?ibb\.co\//i;

/**
 * Returns the link only if it can really be shown as a picture; otherwise "".
 * (An ibb.co page link is not a picture, so it is skipped instead of showing a broken image.)
 */
export function usableImage(url: string | undefined): string {
  if (!url) return "";
  if (VIEWER_LINK.test(url)) {
    if (import.meta.env.DEV) {
      console.warn(
        `[media.ts] "${url}" is an ibb.co page link, not a picture. Use the direct link that starts with https://i.ibb.co/`,
      );
    }
    return "";
  }
  return url;
}
