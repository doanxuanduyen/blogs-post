import { useEffect, useState } from "react";
import { posts, type PostData } from "@/posts/shared/data/posts.data.ts";
import type { FilterState } from "@/posts/PostsPage.tsx";
import { PostCard } from "@/posts/post-list/post-detail-card.tsx";

interface PostListProps {
  filterValue: FilterState;
}

export const PostList = ({ filterValue }: PostListProps) => {
  const [dataPosts, setDataPosts] = useState<PostData[]>([]);

  function filterPosts() {
    const result = posts.filter((post) => {
      const resultFilterSearch = post.title
        .toLowerCase()
        .includes((filterValue.searchValue ?? "").toLowerCase());
      const resultFilterCategory =
        filterValue.selectedCategory === "all" ||
        filterValue.selectedCategory === post.categoryName;
      const resultFilterAuthors =
        filterValue.selectedAuthors === "all" ||
        filterValue.selectedAuthors === post.authorName;
      return resultFilterSearch && resultFilterCategory && resultFilterAuthors;
    });

    if (filterValue.selectedNews === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filterValue.selectedNews === "Oldest First") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return result;
  }

  const filteredPosts = filterPosts();

  useEffect(function loadAPI() {
    setDataPosts(posts);
  }, []);

  return (
    <>
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {filteredPosts?.length} of {dataPosts.length} posts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
