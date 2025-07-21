export interface BaseOption {
  id: string;
  name: string;
}

export const categories: BaseOption[] = [
  { id: "technology", name: "Technology" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "health", name: "Health" },
];

export const authors: BaseOption[] = [
  { id: "au1", name: "Doris Nguyễn" },
  { id: "au2", name: "Minh Trí" },
  { id: "au3", name: "Hà Vy" },
];

export const sort: BaseOption[] = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "title", name: "Title A - Z" },
];
