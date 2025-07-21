import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required and must be at least 5 characters"),
  excerpt: z
    .string()
    .min(20, "Excerpt is required and must be at least 20 characters"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  estimated: z.string().trim().min(1, "Read time is required"),
  content: z.string().min(100, "Content must be at least 100 characters"),
});

export type PostSchema = z.infer<typeof postSchema>;
