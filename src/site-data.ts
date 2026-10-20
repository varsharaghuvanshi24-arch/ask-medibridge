/**
 * EDIT THIS FILE to change the website content.
 *
 * Everything the public pages show (contact details, hospitals, doctors,
 * treatments, services, blog posts, FAQs, legal text) lives here, so you can
 * update the site without touching the page code.
 *
 * Anything marked `placeholder: true` is shown on the site with a visible
 * "Placeholder" badge. Replace the details and set `placeholder: false` (or
 * delete the line) once you have the real information.
 */

export const site = {
  name: "Medibridge International",
  shortName: "Medibridge",
  // The country patients travel TO. Used in headings and copy across the site.
  destination: "India",
  tagline: "A clear path to the right hospital, doctor and care plan.",
  description:
    "Medibridge International helps patients from abroad share their medical reports, compare treatment options and plan travel for care in India, with one coordinator guiding each step.",
  // Leave a value empty ("") until you have the real one. Empty values show a
  // placeholder on the contact page, and the call / WhatsApp buttons fall back
  // to the enquiry form.
  contact: {
    email: "info@medibridgeinc.com",
    phone: "+91 92118 25898", // include country code
    whatsapp: "919211825898", // digits only with country code
    address: "Plot No. 1199, Sector 46, Near Bakhtawar Chowk, Gurugram, Haryana 122003, India",
    hours: "",
  },
};

export type NavItem = { slug: string; label: string };

export const primaryNav: NavItem[] = [
  { slug: "treatments", label: "Treatments" },
  { slug: "hospitals", label: "Hospitals" },
  { slug: "doctors", label: "Doctors" },
  { slug: "visa", label: "Visa" },
  { slug: "services", label: "Services" },
];

export const secondaryNav: NavItem[] = [
  { slug: "about", label: "About" },
  { slug: "consultation", label: "Consultation" },
  { slug: "gallery", label: "Gallery" },
  { slug: "blog", label: "Blog" },
  { slug: "contact", label: "Contact" },
];

export const legalNav: NavItem[] = [
  { slug: "privacy", label: "Privacy policy" },
  { slug: "terms", label: "Terms of use" },
];

/* ------------------------------------------------------------------ */
/* Journey                                                             */
/* ------------------------------------------------------------------ */

export const journey = [
  {
    title: "Share your reports",
    text: "Send your enquiry with recent medical reports. Files go to private storage, never a public page.",
  },
  {
    title: "Doctor opinion and estimate",
    text: "Your reports are reviewed by a specialist and you receive a treatment plan and an estimate range.",
  },
  {
    title: "Choose your hospital",
    text: "Compare hospitals and doctors with your coordinator, then confirm the plan that suits you.",
  },
  {
    title: "Visa and travel support",
    text: "We help you prepare the hospital invitation and the document checklist for a medical visa.",
  },
  {
    title: "Arrival and care",
    text: "A coordinator helps with arrival, admission, language support and your care schedule.",
  },
  {
    title: "Follow-up",
    text: "Return-home planning and follow-up consultations with your treating team.",
  },
];

/* ------------------------------------------------------------------ */
/* Treatments                                                          */
/* ------------------------------------------------------------------ */

export type Treatment = {
  slug: string;
  name: string;
  summary: string;
  helps: string[];
  send: string[];
};

const commonSend = [
  "Passport copy (photo page)",
  "Latest reports and scans (PDF or clear photos)",
  "List of current medicines",
  "Short summary of your history and what you want to know",
];

export const treatments: Treatment[] = [
  {
    slug: "cardiology",
    name: "Cardiology and heart surgery",
    summary: "Second opinions and planning for heart conditions, procedures and surgery.",
    helps: [
      "Reviewing angiogram, echo and ECG reports",
      "Comparing medical, stent and surgical options",
      "Matching you with cardiac teams and hospitals",
    ],
    send: ["Angiogram or CT angiogram report", "Echo and ECG reports", ...commonSend],
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics and joint replacement",
    summary: "Hip, knee, shoulder and sports-injury care, from opinion to rehabilitation planning.",
    helps: [
      "Reviewing X-ray and MRI findings",
      "Explaining replacement and non-surgical options",
      "Planning the stay and rehabilitation",
    ],
    send: ["X-ray and MRI reports with images", ...commonSend],
  },
  {
    slug: "oncology",
    name: "Cancer care (oncology)",
    summary: "Opinion and planning for diagnosis, surgery, chemotherapy and radiation.",
    helps: [
      "Reviewing biopsy, pathology and scan reports",
      "Coordinating tumour-board style opinions",
      "Planning treatment and accommodation",
    ],
    send: ["Biopsy and pathology report", "PET-CT or CT scan reports", ...commonSend],
  },
  {
    slug: "neurology-spine",
    name: "Neurology, neurosurgery and spine",
    summary: "Brain, nerve and spine conditions, including surgical and non-surgical pathways.",
    helps: [
      "Reviewing MRI and CT reports",
      "Comparing surgical and conservative approaches",
      "Planning travel and recovery support",
    ],
    send: ["MRI or CT reports with images", ...commonSend],
  },
  {
    slug: "gastro-liver",
    name: "Gastroenterology and liver care",
    summary: "Digestive and liver conditions, including transplant evaluation and endoscopic care.",
    helps: [
      "Reviewing endoscopy, imaging and lab reports",
      "Explaining treatment and transplant pathways",
      "Coordinating specialist consultations",
    ],
    send: ["Endoscopy and imaging reports", "Liver and kidney function tests", ...commonSend],
  },
  {
    slug: "fertility",
    name: "Fertility and IVF",
    summary: "Fertility evaluation and assisted-reproduction planning for couples.",
    helps: [
      "Reviewing previous investigations and cycles",
      "Explaining available approaches",
      "Planning visits around treatment schedules",
    ],
    send: ["Previous fertility reports and cycle history", ...commonSend],
  },
  {
    slug: "eye-care",
    name: "Eye care (ophthalmology)",
    summary: "Cataract, retina, glaucoma and vision-correction consultations.",
    helps: [
      "Reviewing eye examination reports",
      "Explaining surgical and laser options",
      "Scheduling consultation and procedure",
    ],
    send: ["Eye examination and scan reports", ...commonSend],
  },
  {
    slug: "kidney-urology",
    name: "Kidney and urology",
    summary: "Kidney disease, stones, prostate care and transplant evaluation.",
    helps: [
      "Reviewing kidney function and imaging reports",
      "Comparing treatment and dialysis planning options",
      "Coordinating specialist consultations",
    ],
    send: ["Kidney function tests and imaging", ...commonSend],
  },
  {
    slug: "dental-cosmetic",
    name: "Dental and cosmetic care",
    summary: "Dental implants, restorative work and planned cosmetic procedures.",
    helps: [
      "Reviewing dental X-rays and photos",
      "Planning visits and number of days required",
      "Coordinating consultation and treatment",
    ],
    send: ["Dental X-rays or panoramic scan", "Clear photos of the area of concern", ...commonSend],
  },
  {
    slug: "bariatric",
    name: "Weight-loss (bariatric) surgery",
    summary:
      "Evaluation and planning for weight-loss surgery with pre- and post-operative support.",
    helps: [
      "Reviewing health history and eligibility information",
      "Explaining procedure options",
      "Planning the stay and aftercare",
    ],
    send: ["Recent blood tests", "Height, weight and weight history", ...commonSend],
  },
];

/* ------------------------------------------------------------------ */
/* Hospitals and doctors                                               */
/* Photos live in src/media.ts. Qualifications / experience / languages */
/* for doctors are left empty on purpose: fill them from each          */
/* hospital's official profile. Empty values are hidden on the page.   */
/* ------------------------------------------------------------------ */

export type HospitalStat = { label: string; value: string };

export type Hospital = {
  slug: string;
  name: string;
  accreditations: string[];
  area: string;
  city: string;
  address: string;
  stats: HospitalStat[];
  summary: string;
  overview: string;
  /** Key specialties / centres of excellence (also used as filter tags). */
  specialties: string[];
  mapQuery: string;
  /** Kept for older code that reads `about`. */
  about: string;
};

type HospitalInput = Omit<Hospital, "about" | "mapQuery" | "address"> & { address?: string };

function hospital(h: HospitalInput): Hospital {
  const address = h.address ?? `${h.area}, ${h.city}`;
  return { ...h, address, about: h.summary, mapQuery: `${h.name}, ${address}` };
}

export const hospitals: Hospital[] = [
  hospital({
    slug: "fortis-memorial",
    name: "Fortis Memorial Research Institute",
    accreditations: ["JCI", "NABH", "NABL", "CEA"],
    area: "Sector 44, Opp. HUDA City Centre",
    city: "Gurugram",
    stats: [
      { label: "Beds", value: "311 (expandable to 1000)" },
      { label: "Operating theatres", value: "15 modular" },
      { label: "Super-specialties", value: "30+" },
    ],
    summary: "Flagship quaternary-care hospital of Fortis Healthcare.",
    overview:
      "Fortis Memorial Research Institute is the flagship quaternary-care hospital of Fortis Healthcare. It offers more than 30 super-specialties, including cardiac sciences, neurosciences, oncology, renal and liver transplant, and bone marrow transplant.",
    specialties: ["Oncology", "Neurosciences", "Cardiac Sciences", "BMT"],
  }),
  hospital({
    slug: "medanta",
    name: "Medanta — The Medicity",
    accreditations: ["JCI", "NABH"],
    area: "Sector 38",
    city: "Gurugram",
    stats: [
      { label: "Beds", value: "1600+" },
      { label: "Operating theatres", value: "37+" },
      { label: "ICU beds", value: "300+" },
      { label: "Doctors", value: "800+" },
      { label: "Campus", value: "43 acres" },
      { label: "Patients from", value: "130+ countries" },
    ],
    summary: "A large multi-super-specialty medical city founded by Dr. Naresh Trehan.",
    overview:
      "Medanta — The Medicity is a large multi-super-specialty hospital campus founded by cardiac surgeon Dr. Naresh Trehan. It has treated patients from more than 130 countries, with particular strength in cardiac sciences, liver transplant, oncology and kidney transplant.",
    specialties: ["Cardiac Sciences", "Liver Transplant", "Oncology", "Kidney Transplant"],
  }),
  hospital({
    slug: "artemis",
    name: "Artemis Hospital",
    accreditations: ["JCI", "NABH"],
    area: "Sector 51",
    city: "Gurugram",
    stats: [
      { label: "Beds", value: "750+" },
      { label: "Established", value: "2007" },
      { label: "Centres of Excellence", value: "12" },
      { label: "Full-time doctors", value: "400+" },
      { label: "Specialties", value: "40+" },
    ],
    summary: "The first hospital in Gurugram to hold both JCI and NABH accreditation.",
    overview:
      "Artemis Hospital opened in 2007 and was the first hospital in Gurugram to receive both JCI and NABH accreditation. It runs 12 Centres of Excellence with over 400 full-time doctors across more than 40 specialties.",
    specialties: ["Cardiology", "Oncology", "Neurosurgery", "Orthopedics"],
  }),
  hospital({
    slug: "paras",
    name: "Paras Health",
    accreditations: ["NABH", "NABL"],
    area: "C-1, Sushant Lok Phase I, Sector 43",
    city: "Gurugram",
    stats: [
      { label: "Beds", value: "300" },
      { label: "ICU beds", value: "80" },
      { label: "Established", value: "2006" },
      { label: "Specialties", value: "36" },
    ],
    summary: "Flagship of the Paras Health network, strong in IVF, neurosciences and cardiology.",
    overview:
      "Paras Health in Sushant Lok is the flagship hospital of the Paras Health network. It has 300 beds, including 80 ICU beds, and covers 36 specialties with particular strength in IVF and fertility, neurosciences and cardiology.",
    specialties: ["Neurosciences", "Cardiology", "IVF", "Orthopedics"],
  }),
  hospital({
    slug: "shalby",
    name: "Shalby International Hospital",
    accreditations: ["NABH"],
    area: "Golf Course Road, DLF Phase 5, Sector 53",
    city: "Gurugram",
    stats: [
      { label: "Beds", value: "150" },
      { label: "ICU beds", value: "35" },
      { label: "Established", value: "2018" },
      { label: "Specialties", value: "30+" },
    ],
    summary: "A focused, high-end surgical hospital with several centres of excellence.",
    overview:
      "Shalby International Hospital is a focused, high-end surgical hospital that now covers more than 30 specialties. Its Centres of Excellence include oncology, neurosciences, nephrology and transplants.",
    specialties: ["BMT", "Urology", "Oncology", "Nephrology"],
  }),
  hospital({
    slug: "ck-birla",
    name: "CK Birla Hospital",
    accreditations: ["NABH"],
    area: "Block J, Mayfield Garden, Sector 51",
    city: "Gurugram",
    stats: [
      { label: "ICU beds", value: "70" },
      { label: "Operating theatres", value: "5 modular" },
      { label: "NICU", value: "15-bed Level III" },
    ],
    summary:
      "NABH-accredited multi-specialty hospital, a regional leader in mother and child care.",
    overview:
      "CK Birla Hospital is an NABH-accredited multi-specialty hospital run by the CK Birla Group. It is a regional leader in mother and child care, with a water-birthing suite, a 15-bed Level III NICU and a modern IVF lab.",
    specialties: ["Obstetrics & Gynae", "Fertility / IVF", "Neonatology", "Orthopedics"],
  }),
  hospital({
    slug: "max-saket",
    name: "Max Super Speciality Hospital, Saket",
    accreditations: ["JCI", "NABH", "NABL"],
    area: "1, 2 Press Enclave Marg, Saket Institutional Area",
    city: "New Delhi",
    stats: [
      { label: "Beds", value: "530+" },
      { label: "Specialties", value: "38" },
      { label: "Notable", value: "Asia's first BrainSUITE" },
    ],
    summary: "Flagship of Max Healthcare, a hub for neuro, cancer, cardiac and transplant care.",
    overview:
      "Max Super Speciality Hospital in Saket is the flagship of Max Healthcare. It is a regional hub for neurovascular intervention, targeted cancer treatment, complex cardiac procedures and organ transplants, and houses Asia's first BrainSUITE.",
    specialties: ["Oncology", "Neurosciences", "Transplants", "Bariatric Surgery"],
  }),
  hospital({
    slug: "blk-max",
    name: "BLK-Max Super Speciality Hospital",
    accreditations: ["JCI", "NABH", "NABL"],
    area: "Pusa Road, Rajendra Place",
    city: "New Delhi",
    stats: [
      { label: "Beds", value: "650" },
      { label: "Operating theatres", value: "17 modular" },
      { label: "Critical care beds", value: "125" },
    ],
    summary: "Home to one of Asia's largest bone marrow transplant centres.",
    overview:
      "BLK-Max Super Speciality Hospital is home to one of Asia's largest bone marrow transplant centres. It is also strong in oncology, robotic surgery and cardiac sciences, and has a dedicated international patient team.",
    specialties: ["Oncology", "BMT", "Cardiac Surgery", "Orthopedics"],
  }),
];

export type Doctor = {
  slug: string;
  name: string;
  speciality: string;
  hospitalSlug: string;
  /** Hospital name, filled in automatically from `hospitalSlug`. */
  hospital: string;
  bio: string;
  focus: string[];
  /** Leave "" until verified from the hospital's official profile; empty rows are hidden. */
  qualifications: string;
  experience: string;
  languages: string;
};

type DoctorInput = {
  slug: string;
  name: string;
  speciality: string;
  hospitalSlug: string;
  focus: string[];
  bio?: string;
  qualifications?: string;
  experience?: string;
  languages?: string;
};

const hospitalName = (slug: string) => hospitals.find((h) => h.slug === slug)?.name ?? "";

function doctor(d: DoctorInput): Doctor {
  const hospital = hospitalName(d.hospitalSlug);
  return {
    slug: d.slug,
    name: d.name,
    speciality: d.speciality,
    hospitalSlug: d.hospitalSlug,
    hospital,
    bio: d.bio ?? `${d.name} is a specialist in ${d.speciality} at ${hospital}.`,
    focus: d.focus,
    qualifications: d.qualifications ?? "",
    experience: d.experience ?? "",
    languages: d.languages ?? "",
  };
}

export const doctors: Doctor[] = [
  // Fortis Memorial Research Institute
  doctor({
    slug: "ashok-seth",
    name: "Dr. Ashok Seth",
    speciality: "Interventional Cardiology",
    hospitalSlug: "fortis-memorial",
    bio: "Dr. Ashok Seth is Chairman of the Fortis Escorts Heart Institute at Fortis Memorial Research Institute, working in interventional cardiology.",
    focus: ["Complex angioplasty", "Structural heart procedures"],
  }),
  doctor({
    slug: "rahul-bhargava",
    name: "Dr. Rahul Bhargava",
    speciality: "Haemato-Oncology & BMT",
    hospitalSlug: "fortis-memorial",
    focus: ["Blood cancers", "Bone marrow / stem-cell transplant"],
  }),
  doctor({
    slug: "rama-joshi",
    name: "Dr. Rama Joshi",
    speciality: "Gynaecologic Oncology",
    hospitalSlug: "fortis-memorial",
    focus: ["Cancers of the cervix, ovary and uterus"],
  }),
  doctor({
    slug: "rana-patir",
    name: "Dr. Rana Patir",
    speciality: "Neurosurgery",
    hospitalSlug: "fortis-memorial",
    focus: ["Brain surgery", "Spine surgery"],
  }),
  doctor({
    slug: "vivek-vij",
    name: "Dr. Vivek Vij",
    speciality: "Liver Transplant",
    hospitalSlug: "fortis-memorial",
    focus: ["Liver transplantation", "Advanced liver disease"],
  }),
  doctor({
    slug: "praveer-agarwal",
    name: "Dr. Praveer Agarwal",
    speciality: "Interventional Cardiology",
    hospitalSlug: "fortis-memorial",
    focus: ["Angioplasty", "Coronary interventions"],
  }),
  doctor({
    slug: "sandeep-vaishya",
    name: "Dr. Sandeep Vaishya",
    speciality: "Neurosurgery",
    hospitalSlug: "fortis-memorial",
    focus: ["Brain surgery", "Spine surgery"],
  }),
  // Medanta — The Medicity
  doctor({
    slug: "naresh-trehan",
    name: "Dr. Naresh Trehan",
    speciality: "Cardiac Surgery",
    hospitalSlug: "medanta",
    bio: "Dr. Naresh Trehan is a cardiac surgeon and the founder of Medanta — The Medicity.",
    focus: ["Bypass surgery", "Heart-valve surgery"],
  }),
  doctor({
    slug: "a-s-soin",
    name: "Dr. A. S. Soin",
    speciality: "Liver Transplant",
    hospitalSlug: "medanta",
    focus: ["Liver transplantation"],
  }),
  doctor({
    slug: "rajesh-ahlawat",
    name: "Dr. Rajesh Ahlawat",
    speciality: "Urology",
    hospitalSlug: "medanta",
    focus: ["Kidney stones", "Prostate conditions", "Urological cancers"],
  }),
  doctor({
    slug: "ashok-rajgopal",
    name: "Dr. Ashok Rajgopal",
    speciality: "Orthopedics",
    hospitalSlug: "medanta",
    focus: ["Joint replacement"],
  }),
  doctor({
    slug: "yugal-kishore-mishra",
    name: "Dr. Yugal Kishore Mishra",
    speciality: "CTVS (Cardiothoracic & Vascular Surgery)",
    hospitalSlug: "medanta",
    focus: ["Heart surgery", "Chest surgery"],
  }),
  doctor({
    slug: "neelam-mohan",
    name: "Dr. Neelam Mohan",
    speciality: "Pediatric Gastroenterology & Liver Transplant",
    hospitalSlug: "medanta",
    focus: ["Children's liver conditions", "Children's digestive conditions"],
  }),
  doctor({
    slug: "sushila-kataria",
    name: "Dr. Sushila Kataria",
    speciality: "Internal Medicine & Infectious Diseases",
    hospitalSlug: "medanta",
    focus: ["Complex medical conditions", "Infections"],
  }),
  // Artemis Hospital
  doctor({
    slug: "ashok-vaid",
    name: "Dr. Ashok Vaid",
    speciality: "Medical Oncology",
    hospitalSlug: "artemis",
    focus: ["Chemotherapy", "Targeted therapy", "Immunotherapy"],
  }),
  doctor({
    slug: "subhash-chandra",
    name: "Dr. Subhash Chandra",
    speciality: "Cardiology",
    hospitalSlug: "artemis",
    focus: ["Heart-disease diagnosis and management"],
  }),
  doctor({
    slug: "sanjay-gogoi",
    name: "Dr. Sanjay Gogoi",
    speciality: "Urology",
    hospitalSlug: "artemis",
    focus: ["Kidney care", "Prostate care", "Urological conditions"],
  }),
  // Paras Health
  doctor({
    slug: "aman-priya-khanna",
    name: "Dr. Aman Priya Khanna",
    speciality: "Bariatric & Metabolic Surgery",
    hospitalSlug: "paras",
    focus: ["Weight-loss surgery", "Metabolic surgery"],
  }),
  doctor({
    slug: "manish-vaish",
    name: "Dr. Manish Vaish",
    speciality: "Neurosurgery",
    hospitalSlug: "paras",
    focus: ["Brain surgery", "Spine surgery"],
  }),
  doctor({
    slug: "manisha-singh",
    name: "Dr. Manisha Singh",
    speciality: "IVF & Fertility",
    hospitalSlug: "paras",
    focus: ["Assisted reproduction"],
  }),
];

/** Doctors shown on the home page. */
export const featuredDoctorSlugs = [
  "ashok-seth",
  "naresh-trehan",
  "rahul-bhargava",
  "a-s-soin",
  "ashok-vaid",
  "rajesh-ahlawat",
  "ashok-rajgopal",
  "manisha-singh",
];

export const hospitalBySlug = (slug: string) => hospitals.find((h) => h.slug === slug);
export const doctorBySlug = (slug: string) => doctors.find((d) => d.slug === slug);

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  {
    title: "Medical opinion coordination",
    text: "We organise your reports and present them to the right specialist for an opinion.",
  },
  {
    title: "Treatment plan and estimate",
    text: "A written plan with an estimate range, so you can compare before you decide.",
  },
  {
    title: "Appointments and admission",
    text: "Consultation scheduling and help with admission formalities at the hospital.",
  },
  {
    title: "Visa invitation support",
    text: "Help requesting the hospital invitation letter and preparing your document checklist.",
  },
  {
    title: "Arrival, stay and transport",
    text: "Airport pickup, accommodation suggestions near the hospital and local transport help.",
  },
  {
    title: "Language support",
    text: "Interpreter assistance during consultations where available.",
  },
  {
    title: "Companion support",
    text: "Guidance for family members travelling with you.",
  },
  {
    title: "Follow-up coordination",
    text: "Help arranging follow-up consultations and sharing records with your doctor at home.",
  },
];

/* ------------------------------------------------------------------ */
/* Visa                                                                */
/* ------------------------------------------------------------------ */

export const visaSteps = [
  "Confirm your treatment plan and hospital with your coordinator.",
  "Request the hospital invitation letter through Medibridge.",
  "Check the current medical visa category, fees and rules on the official government website or your nearest embassy or consulate.",
  "Prepare your documents and submit the application through the official channel.",
  "Keep copies of your visa, invitation letter and medical records with you when you travel.",
];

export const visaChecklist = [
  "Passport valid for the period required by the visa rules",
  "Recent passport-size photographs",
  "Hospital invitation letter",
  "Medical reports and treatment summary",
  "Proof of funds, if requested",
  "Travel and health insurance details",
  "Return or onward travel plan",
];

/* ------------------------------------------------------------------ */
/* Blog (SAMPLE ARTICLES: replace with your own)                       */
/* ------------------------------------------------------------------ */

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "prepare-reports-for-a-second-opinion",
    title: "How to prepare your medical reports for a second opinion",
    summary: "A short checklist so specialists can review your case quickly.",
    date: "2026-10-01",
    body: [
      "A clear set of reports helps a specialist give a useful opinion. Gather the most recent versions of your tests and scans, and include older results if they show how your condition has changed.",
      "Scan or photograph each page clearly, with all text readable and nothing cut off. Imaging reports are most useful when you can also share the images themselves, usually available on a disc or through a download link from the imaging centre.",
      "Write a short summary: your diagnosis if you know it, treatments so far, current medicines, allergies and the exact question you want answered. This summary is often the most helpful page in the file.",
      "Share your reports only through secure channels. On this website, files attached to an enquiry are stored privately.",
    ],
  },
  {
    slug: "questions-to-ask-before-you-travel",
    title: "Questions to ask before you travel for treatment",
    summary: "Ten minutes of preparation that avoids surprises later.",
    date: "2026-10-05",
    body: [
      "Ask what the treatment plan includes and what it does not. Clarify whether the estimate covers tests, medicines, room type, and follow-up visits.",
      "Ask how long you will need to stay, when you can safely fly home and what follow-up care you will need once you are back.",
      "Ask who the treating doctor will be, and whether you can speak to them before you travel.",
      "Ask what happens if the plan changes after your tests. A good coordinator will explain how revised estimates are shared with you.",
    ],
  },
  {
    slug: "planning-your-medical-trip",
    title: "Planning your medical trip: stay, companions and paperwork",
    summary: "What to organise so you can focus on your recovery.",
    date: "2026-10-10",
    body: [
      "Plan the stay around the treatment schedule rather than the other way round. Leave a buffer for tests, consultations and recovery before you book return travel.",
      "Decide who will travel with you. A companion can help with paperwork, communication and day-to-day support.",
      "Keep digital and paper copies of your passport, visa, invitation letter, reports and insurance details. Carry your medicines in their original packaging.",
      "Visa rules, fees and processing times change, so always confirm the current requirements on the official government website.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* FAQs (also power the Medibridge Assistant)                          */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string; keywords: string[] };

export const faqs: Faq[] = [
  {
    q: "How does the process work?",
    a: "You send an enquiry with your reports. A specialist reviews them, you receive a treatment plan and an estimate range, and then you choose a hospital. Your coordinator then helps with visa documents, travel, admission and follow-up.",
    keywords: ["process", "how", "work", "steps", "start", "begin"],
  },
  {
    q: "Which documents should I send?",
    a: "Send your latest reports and scans, a copy of your passport photo page, a list of current medicines and a short summary of your history and your question. Each treatment page lists what is most useful for that condition.",
    keywords: ["document", "documents", "report", "reports", "scan", "send", "upload", "passport"],
  },
  {
    q: "How much will treatment cost?",
    a: "Cost depends on your diagnosis, the hospital, the type of room and the length of stay. After your reports are reviewed, you receive an estimate range in writing, so you can compare before deciding.",
    keywords: [
      "cost",
      "price",
      "prices",
      "estimate",
      "fee",
      "fees",
      "charges",
      "expensive",
      "cheap",
    ],
  },
  {
    q: "Are my medical reports kept private?",
    a: "Files attached to an enquiry are stored in private storage that is not open to the public. Please read our privacy policy for details on how your information is used.",
    keywords: ["private", "privacy", "confidential", "secure", "safe", "data", "security"],
  },
  {
    q: "Can you give me medical advice?",
    a: "No. Medibridge coordinates your care. Medical opinions and treatment decisions come from qualified doctors who review your reports. The assistant on this site cannot give medical advice.",
    keywords: [
      "advice",
      "diagnose",
      "diagnosis",
      "doctor",
      "medical",
      "symptom",
      "symptoms",
      "disease",
    ],
  },
  {
    q: "Do you help with the medical visa?",
    a: "We help you request the hospital invitation letter and prepare a document checklist. Visa rules, fees and processing times are set by the government, so always confirm them on the official website or with your nearest embassy or consulate.",
    keywords: ["visa", "invitation", "embassy", "consulate", "travel", "permit"],
  },
  {
    q: "Can a family member travel with me?",
    a: "Yes, companions can usually travel with you. Tell us how many people are travelling when you send your enquiry, so we can plan accommodation and visa documents for everyone.",
    keywords: [
      "family",
      "companion",
      "attendant",
      "relative",
      "accompany",
      "wife",
      "husband",
      "parents",
    ],
  },
  {
    q: "How do I get in touch?",
    a: "Use the enquiry form on the contact page. Contact details, when available, are listed on the contact page.",
    keywords: ["contact", "call", "phone", "email", "whatsapp", "reach", "talk", "number"],
  },
];

/* ------------------------------------------------------------------ */
/* Legal (DRAFTS: have these reviewed by a qualified professional)     */
/* ------------------------------------------------------------------ */

export type LegalSection = { title: string; text: string };

export const privacySections: LegalSection[] = [
  {
    title: "What we collect",
    text: "When you send an enquiry we collect your name, country, phone number, the treatment you are asking about, your message and, if you choose to attach them, your medical reports. We collect only what you submit.",
  },
  {
    title: "How we use it",
    text: "We use your details to review your enquiry, arrange medical opinions and contact you about your care options. We do not use your information for unrelated purposes.",
  },
  {
    title: "Medical reports",
    text: "Reports you attach are stored in private storage that is not accessible to the public. They are shared only with the clinicians and hospital teams involved in reviewing your case.",
  },
  {
    title: "Consent",
    text: "We ask for your consent before you submit an enquiry. You can ask us to correct or delete your information by contacting us.",
  },
  {
    title: "Retention and security",
    text: "We keep enquiry information only as long as it is needed for the purposes above or as required by law, and take reasonable steps to protect it.",
  },
  {
    title: "Contact",
    text: "For privacy questions, use the details on the contact page.",
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "About this website",
    text: "This website provides general information about medical travel and lets you send an enquiry. It is not a hospital and does not provide medical care.",
  },
  {
    title: "No medical advice",
    text: "Nothing on this website is medical advice, diagnosis or treatment. Always seek the advice of a qualified doctor about your condition. In an emergency, contact your local emergency services.",
  },
  {
    title: "Estimates",
    text: "Any cost estimate is an indication based on the information provided. Final costs depend on your diagnosis, tests, treatment and hospital charges.",
  },
  {
    title: "Third parties",
    text: "Hospitals and doctors are independent of Medibridge. Treatment decisions are made between you and your treating doctor.",
  },
  {
    title: "Changes",
    text: "We may update these terms and the content of this website from time to time.",
  },
];

/* ------------------------------------------------------------------ */
/* Page titles and descriptions (used for browser tabs and search)     */
/* ------------------------------------------------------------------ */

export const pageMeta: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Medibridge",
    description:
      "Who we are and how Medibridge International coordinates medical travel for patients from abroad.",
  },
  hospitals: {
    title: "Partner hospitals",
    description: "Hospitals Medibridge International works with for international patients.",
  },
  doctors: {
    title: "Doctors and specialists",
    description:
      "Specialists who review international patient cases through Medibridge International.",
  },
  treatments: {
    title: "Treatments and specialities",
    description:
      "Treatment areas Medibridge International can help you explore, with the documents to prepare for each.",
  },
  services: {
    title: "Our services",
    description:
      "Medical opinion, estimates, visa support, travel and follow-up coordination from Medibridge International.",
  },
  consultation: {
    title: "Request a consultation",
    description:
      "How to get a specialist opinion on your reports through Medibridge International.",
  },
  visa: {
    title: "Medical visa guidance",
    description:
      "A practical checklist for planning a medical visa, with pointers to official sources.",
  },
  gallery: {
    title: "Gallery",
    description: "Images and the introduction video from Medibridge International.",
  },
  blog: {
    title: "Blog and guides",
    description: "Practical guides for patients planning treatment abroad.",
  },
  contact: {
    title: "Contact and enquiry",
    description: "Send an enquiry or find contact details for Medibridge International.",
  },
  privacy: {
    title: "Privacy policy",
    description:
      "How Medibridge International handles your enquiry and medical report information.",
  },
  terms: {
    title: "Terms of use",
    description: "Terms for using the Medibridge International website.",
  },
};
