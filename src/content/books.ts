export type BookCategory = "novels" | "education" | "dhamma" | "children";

export type BookId =
  | "river-house"
  | "monsoon-letters"
  | "matric-maths"
  | "everyday-english"
  | "daily-dhamma"
  | "quiet-mind"
  | "little-elephant"
  | "first-alphabet";

export type Book = {
  id: BookId;
  category: BookCategory;
  /** Price in kyat. */
  price: number;
  /** Optional cover photo under /public; without one a designed cover is drawn. */
  cover?: string;
  /** Background colour of the drawn cover. */
  tone: string;
};

/** Most copies of one title a single order can hold. */
export const MAX_QTY = 99;

export const bookCategories: BookCategory[] = ["novels", "education", "dhamma", "children"];

// Placeholder catalogue: titles, authors and blurbs live in messages under Books.items.
export const books: Book[] = [
  { id: "river-house", category: "novels", price: 8500, tone: "#1f6b12" },
  { id: "monsoon-letters", category: "novels", price: 7500, tone: "#7c2d12" },
  { id: "matric-maths", category: "education", price: 12000, tone: "#1e3a8a" },
  { id: "everyday-english", category: "education", price: 9500, tone: "#0f766e" },
  { id: "daily-dhamma", category: "dhamma", price: 6000, tone: "#a16207" },
  { id: "quiet-mind", category: "dhamma", price: 5500, tone: "#1a1f15" },
  { id: "little-elephant", category: "children", price: 4500, tone: "#be185d" },
  { id: "first-alphabet", category: "children", price: 3500, tone: "#c2410c" },
];

const booksById = new Map(books.map((book) => [book.id, book]));

export function getBook(id: string) {
  return booksById.get(id as BookId);
}

export function formatKs(amount: number) {
  return amount.toLocaleString("en-US");
}
