export type ProductKind = "printing" | "binding";

export type Product = {
  id: string;
  kind: ProductKind;
  name: string;
  blurb: string;
  from: string;
  featured?: boolean;
};

export const productsPage = {
  eyebrow: "Our Products",
  title: "Print, then bind",
  lead: "Two benches, one house. Choose a print method, a bind, or both — we quote from the actual job, not a rate card alone.",
};

export const productGroups: {
  id: ProductKind;
  title: string;
  intro: string;
}[] = [
  {
    id: "printing",
    title: "Printing",
    intro: "Sheets and signatures for books, stationery, and packs.",
  },
  {
    id: "binding",
    title: "Binding",
    intro: "Finishes that hold the run together — from a slim booklet to a hardcover.",
  },
];

export const products: Product[] = [
  {
    id: "offset",
    kind: "printing",
    name: "Offset printing",
    blurb: "Longer runs with even colour on uncoated and coated stocks.",
    from: "Quote by sheet count",
    featured: true,
  },
  {
    id: "digital",
    kind: "printing",
    name: "Digital printing",
    blurb: "Short runs and proofs without plates — fast when the file is ready.",
    from: "Quote by copy count",
  },
  {
    id: "books",
    kind: "printing",
    name: "Books",
    blurb: "Interior text, plates, and covers printed to match the bind you choose.",
    from: "Quote by page extent",
    featured: true,
  },
  {
    id: "magazines",
    kind: "printing",
    name: "Magazines",
    blurb: "Periodicals with tight registration and a clean, repeatable trim.",
    from: "Quote by issue",
  },
  {
    id: "stationery",
    kind: "printing",
    name: "Stationery",
    blurb: "Letterheads, cards, forms, and pads for offices and schools.",
    from: "Quote by set",
  },
  {
    id: "packaging",
    kind: "printing",
    name: "Packaging",
    blurb: "Cartons, sleeves, and wraps with colour that sits on board.",
    from: "Quote by die",
  },
  {
    id: "perfect",
    kind: "binding",
    name: "Perfect binding",
    blurb: "Softcover spines for books, reports, and thicker catalogues.",
    from: "Quote by thickness",
    featured: true,
  },
  {
    id: "saddle",
    kind: "binding",
    name: "Saddle stitch",
    blurb: "Booklets and magazines that lie fairly flat and stay light.",
    from: "Quote by signature",
  },
  {
    id: "spiral",
    kind: "binding",
    name: "Spiral & wire-o",
    blurb: "Lay-flat notebooks, manuals, and calendars that take daily use.",
    from: "Quote by size",
  },
  {
    id: "hardcover",
    kind: "binding",
    name: "Hardcover",
    blurb: "Casebound volumes with boards, cloth or printed wrap, and a firm spine.",
    from: "Quote by case",
  },
];

export const featuredProducts = products.filter((product) => product.featured);
