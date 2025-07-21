import { Filter } from "@/posts/filter/post-filter.tsx";
import { Header } from "@/posts/header/post-header.tsx";
import { PostList } from "@/posts/post-list/post-list.tsx";
import { useState } from "react";

export type FilterState = {
  searchValue?: string;
  selectedCategory?: string;
  selectedAuthors?: string;
  selectedNews?: string;
};

export const PostsPage = () => {
  const [filter, setFilter] = useState<FilterState>({
    searchValue: "",
    selectedCategory: "all",
    selectedAuthors: "all",
    selectedNews: "newest",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Filter filterValue={filter} onFilterChange={setFilter} />
        <PostList filterValue={filter} />
      </div>
    </div>
  );
};
