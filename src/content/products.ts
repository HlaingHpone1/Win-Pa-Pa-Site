export type ProductKind = "printing" | "binding";

export type ProductId =
  | "offset"
  | "digital"
  | "books"
  | "magazines"
  | "stationery"
  | "packaging"
  | "perfect"
  | "saddle"
  | "spiral"
  | "hardcover";

export type Product = {
  id: ProductId;
  kind: ProductKind;
  featured?: boolean;
};

export function productImageSrc(id: ProductId) {
  return `/products/${id}.jpg`;
}

export const productGroupIds: ProductKind[] = ["printing", "binding"];

export const products: Product[] = [
  {
    id: "offset",
    kind: "printing",
    featured: true,
  },
  {
    id: "digital",
    kind: "printing",
  },
  {
    id: "books",
    kind: "printing",
    featured: true,
  },
  {
    id: "magazines",
    kind: "printing",
  },
  {
    id: "stationery",
    kind: "printing",
  },
  {
    id: "packaging",
    kind: "printing",
  },
  {
    id: "perfect",
    kind: "binding",
    featured: true,
  },
  {
    id: "saddle",
    kind: "binding",
  },
  {
    id: "spiral",
    kind: "binding",
  },
  {
    id: "hardcover",
    kind: "binding",
  },
];

export const featuredProducts = products.filter((product) => product.featured);
