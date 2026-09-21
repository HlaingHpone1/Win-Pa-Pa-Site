export const locale = "en" as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/products", label: "Our Products" },
  { href: "/clients", label: "Our Clients" },
  { href: "/contact", label: "Contact us" },
] as const;

export const company = {
  name: "Win Pa Pa",
  fullName: "Win Pa Pa Publishing",
  shortTag: "Printing & binding house",
  tagline: "Print. Bind. Publish.",
  description:
    "Press-ready printing and lasting binds for books, packs, and everyday paper.",
  city: "Yangon",
  addressLines: ["124 Botahtaung Zay Street", "Pazuntaung Township, Yangon"],
  phones: ["09-5101744", "09-424956356"],
  email: "winpapa000001@gmail.com",
  hours: "Monday-Saturday, 9:00-17:00",
  cta: "Get a quote",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.055348013511!2d96.1732340760718!3d16.773921720186074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ede7e726593d%3A0x556c3c6eb09f027c!2sWin%20Pa%20Pa%20Printing%20House!5e0!3m2!1sen!2smm!4v1789978477283!5m2!1sen!2smm",
};

export const home = {
  eyebrow: "Printing & binding house · Yangon",
  title: "Print. Bind. Publish.",
  lead: "A quiet press for clear type, honest paper, and spines that hold. From a single proof to a full run.",
  primaryCta: { label: "Get a quote", href: "/contact" },
  secondaryCta: { label: "See products", href: "/products" },
  services: [
    {
      index: "01",
      title: "Printing",
      body: "Offset and digital for books, magazines, stationery, and packaging — colour that sits true on the sheet.",
      href: "/products#printing",
    },
    {
      index: "02",
      title: "Binding",
      body: "Perfect bind, saddle, spiral, hardcover, and thesis work finished in-house so the book matches the print.",
      href: "/products#binding",
    },
  ],
  stats: [
    { value: "20+", label: "Years since 2005" },
    { value: "1,200+", label: "Jobs on the floor" },
    { value: "80+", label: "Returning clients" },
  ],
  featuredHeading: "On the press",
  featuredKicker:
    "A short look at what we make. The full catalogue lives on Our Products.",
  ctaTitle: "Ready for the next run?",
  ctaBody:
    "Send a brief, a file, or a sample. We will come back with paper, bind, and timing.",
};

export const about = {
  eyebrow: "About us",
  title: "The house",
  lead: "Win Pa Pa is a printing and binding house in Yangon, with over 20 years in this industry since 2005. We set type, run colour, and finish books under one roof.",
  founded: "2005",
  experience: "20+",
  experienceLabel: "Years in printing & binding",
  storyTitle: "Paper, then bind",
  story: [
    "The panda on our mark holds bamboo — a small nod to the fibre that becomes paper. We keep the same idea on the floor: start with the sheet, end with a book you can open every day.",
    "We have been at this since 2005 — over 20 years of press work in Yangon. Jobs come in as manuscripts, brand packs, school texts, and short-run catalogues. We proof, print, bind, and pack them here, with a calendar we actually keep.",
  ],
  founder: {
    name: "Founder",
    role: "Founder, Win Pa Pa Publishing",
    since: "At the press since 2005",
    welcomeEyebrow: "A welcome",
    welcomeTitle: "From the founder",
    welcome: [
      "Thank you for visiting Win Pa Pa. We opened the house in 2005, and we are still here for the same reason: print that sits true on the sheet, and a bind that lasts.",
      "If you are starting a book, a pack, or a short run, you are welcome at the press. Bring a file, a sample, or a question — we will meet you on paper.",
    ],
  },
  purposeTitle: "Mission & vision",
  mission: {
    title: "Our Mission",
    body: "To print and bind with care — accurate colour, honest paper, and a calendar we keep — for schools, presses, and everyday work in Yangon.",
  },
  vision: {
    title: "Our Vision",
    body: "A house people return to for the next run, known for work that holds on the shelf and a press that still feels personal after twenty years.",
  },
  valuesTitle: "How we work",
  values: [
    {
      title: "Accuracy",
      body: "Registration, trim, and pagination checked before a run leaves the press.",
    },
    {
      title: "Bind quality",
      body: "Spines, stitches, and covers finished so the book survives a bag and a shelf.",
    },
    {
      title: "Deadlines",
      body: "A press calendar we share up front — and hold, even when the job is tight.",
    },
  ],
  processTitle: "From brief to door",
  process: [
    {
      step: "01",
      title: "Brief",
      body: "Paper, size, colour, bind, and count. A file or a sample helps.",
    },
    {
      step: "02",
      title: "Print",
      body: "Proof, then offset or digital depending on the run.",
    },
    {
      step: "03",
      title: "Bind",
      body: "Perfect, saddle, spiral, hardcover, or thesis — in house.",
    },
    {
      step: "04",
      title: "Deliver",
      body: "Packed and sent across Yangon, or held for collection.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact us",
  title: "Start a job",
  lead: "Tell us what you are printing. We will reply with paper, bind options, and a time.",
  formTitle: "Request a quote",
  successTitle: "Thank you.",
  successBody:
    "Your brief is on its way to the press. We will reply with paper, bind options, and a time.",
  submitError: "Could not send. Please call us or try again.",
  mapTitle: "Find the house",
  mapLead: "Win Pa Pa Printing House on Botahtaung Zay Street, Yangon.",
  fields: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    service: "Service",
    message: "Message",
    submit: "Send brief",
    sending: "Sending…",
    phoneError: "Enter a phone number with 8–15 digits.",
  },
  serviceOptions: [
    { value: "printing", label: "Printing" },
    { value: "binding", label: "Binding" },
    { value: "both", label: "Printing & binding" },
    { value: "other", label: "Something else" },
  ],
};
