/**
 * PHOTOS FOR HOSPITALS AND DOCTORS — EDIT THIS FILE.
 *
 * Paste IMGBB *direct* links between the quotes.
 *
 *   ✅ Works:       "https://i.ibb.co/AbCdEfG/medanta.jpg"
 *   ❌ Won't show:  "https://i.ibb.co/cX7M4Kv5/IMG-b6f8602e-58e9-4f06-9b26-11a966a9bf16.jpg"   (this is the photo's web PAGE, not the photo)
 *
 * How to get the direct link: open the ibb.co link, press and hold the photo
 * (or right-click it) and choose "Copy image address". It must start with
 * https://i.ibb.co/ . You can also use a file inside /public, e.g. "/doctors/seth.jpg".
 *
 * Until a direct link is added, the site shows a clean placeholder (a coloured
 * tile for hospitals, initials for doctors), so nothing looks broken.
 */

// Hospital cover photo, by hospital slug.
export const HOSPITAL_COVER: Record<string, string> = {
  "fortis-memorial": "https://i.ibb.co/H1V8wJL/IMG-669d76b5-80e0-4350-a1ed-cf744fc35422.jpg",
  medanta: "https://i.ibb.co/cX7M4Kv5/IMG-b6f8602e-58e9-4f06-9b26-11a966a9bf16.jpg",
  artemis: "https://i.ibb.co/sd23v1Qz/6405e2d234ec8.webp",
  paras: "https://i.ibb.co/JWV5w7Gc/IMG-41b4e2ea-5d69-4817-960a-3fd246559afa.jpg",
  shalby: "https://i.ibb.co/dsmDksGc/IMG-309eb787-fcd7-4c0c-b51d-7cd670fba414.jpg",
  "ck-birla": "https://i.ibb.co/v4pD1dY7/IMG-21c83bd9-56aa-4ac5-9342-e33ccfe5059c.jpg",
  "max-saket": "https://i.ibb.co/qL83MHNs/IMG-df0ea844-efb3-42e1-8d20-0a5ae097b826.jpg",
  "blk-max": "https://ibb.co/4wH8dH1W", // TODO: direct link
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

// Doctor photo, by doctor slug.
export const DOCTOR_PHOTO: Record<string, string> = {
  "ashok-seth": "https://ibb.co/r28NYjnC", // TODO: direct link
  "rahul-bhargava": "https://ibb.co/bgJkrv31", // TODO: direct link
  "rama-joshi": "https://ibb.co/YBCpYknn", // TODO: direct link
  "rana-patir": "https://ibb.co/bYvgTxM", // TODO: direct link
  "vivek-vij": "https://ibb.co/KzWfPmJb", // TODO: direct link
  "praveer-agarwal": "https://ibb.co/b5W4JHjY", // TODO: direct link
  "sandeep-vaishya": "https://ibb.co/r9kj52R", // TODO: direct link
  "naresh-trehan": "https://ibb.co/DPSR9mcD", // TODO: direct link
  "a-s-soin": "https://ibb.co/39yyp5tF", // TODO: direct link
  "rajesh-ahlawat": "https://ibb.co/FkP18vSf", // TODO: direct link
  "ashok-rajgopal": "https://ibb.co/1JLdwYjn", // TODO: direct link
  "yugal-kishore-mishra": "https://ibb.co/BH5JY7VC", // TODO: direct link
  "neelam-mohan": "https://ibb.co/TMFNqkSC", // TODO: direct link
  "sushila-kataria": "https://ibb.co/C3MHnsJB", // TODO: direct link
  "ashok-vaid": "https://ibb.co/WNKZDrhx", // TODO: direct link
  "subhash-chandra": "https://ibb.co/KxV0g8Wg", // TODO: direct link
  "sanjay-gogoi": "https://ibb.co/G48Kmszg", // TODO: direct link
  "aman-priya-khanna": "https://ibb.co/HDq32ymG", // TODO: direct link
  "manish-vaish": "https://ibb.co/PvxCfgnx", // TODO: direct link
  "manisha-singh": "https://ibb.co/HD9PFRXG", // TODO: direct link
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
