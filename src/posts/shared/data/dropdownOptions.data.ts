export interface Option {
  id: string;
  name: string;
}

export const CATEGORIES: Option[] = [
  { id: "technology", name: "Technology" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "health", name: "Health" },
];

export const AUTHORS: Option[] = [
  { id: "au1", name: "Doris Nguyễn" },
  { id: "au2", name: "Minh Trí" },
  { id: "au3", name: "Hà Vy" },
];

export const SORT: Option[] = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "title", name: "Title A - Z" },
];
