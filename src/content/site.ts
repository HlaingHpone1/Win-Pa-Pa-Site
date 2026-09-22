export const nav = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/clients", key: "clients" },
  { href: "/contact", key: "contact" },
] as const;

export const serviceValues = ["printing", "binding", "both", "other"] as const;

export const company = {
  name: "Win Pa Pa",
  fullName: "Win Pa Pa Publishing",
  city: "Yangon",
  phones: ["09-5101744", "09-424956356"],
  email: "winpapa000001@gmail.com",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.055348013511!2d96.1732340760718!3d16.773921720186074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ede7e726593d%3A0x556c3c6eb09f027c!2sWin%20Pa%20Pa%20Printing%20House!5e0!3m2!1sen!2smm!4v1789978477283!5m2!1sen!2smm",
};

export const heroSlides = [
  { id: "press", src: "/hero/press.jpg" },
  { id: "bindery", src: "/hero/bindery.jpg" },
  { id: "books", src: "/hero/books.jpg" },
  { id: "magazines", src: "/hero/magazines.jpg" },
  { id: "floor", src: "/hero/floor.jpg" },
] as const;

export const homeServices = [
  {
    id: "printing",
    index: "01",
    href: "/products#printing",
    image: "/home-printing.jpg",
  },
  {
    id: "binding",
    index: "02",
    href: "/products#binding",
    image: "/home-binding.jpg",
  },
] as const;

export const homeStats = [
  { id: "years", value: "20+" },
  { id: "jobs", value: "1,200+" },
  { id: "clients", value: "80+" },
] as const;

export const aboutMeta = {
  founded: "2005",
  experience: "20+",
};

export const aboutValues = ["accuracy", "bind", "deadlines"] as const;

export const aboutProcess = [
  { id: "brief", step: "01" },
  { id: "print", step: "02" },
  { id: "bind", step: "03" },
  { id: "deliver", step: "04" },
] as const;
