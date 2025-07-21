import type { FilterState } from "@/posts/PostsPage.tsx";
import Dropdown from "./dropdown-filter.tsx";
import Search from "./search-input.tsx";
import { useEffect, useState } from "react";
import { sort, type BaseOption } from "../shared/data/dropdownOptions.data.ts";
import { posts, type PostData } from "../shared/data/posts.data.ts";

interface FilterProps {
  filterValue: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const Filter = ({ filterValue, onFilterChange }: FilterProps) => {
  const [categoryOptions, setCategoryOptions] = useState<BaseOption[]>([]);
  const [authorOptions, setAuthorOptions] = useState<BaseOption[]>([]);
  const [sortOptions, setSortOptions] = useState<BaseOption[]>([]);

  useEffect(function loadAPI() {
    const getCategoryOptions = (posts: PostData[]): BaseOption[] => {
      const unique = Array.from(
        new Set(posts.map((post) => post.categoryName))
      );
      return [
        { id: "all", name: "All Categories" },
        ...unique.map((cat) => ({ id: cat, name: cat })),
      ];
    };

    const getAuthorOptions = (posts: PostData[]): BaseOption[] => {
      const unique = Array.from(new Set(posts.map((post) => post.authorName)));
      return [
        { id: "all", name: "All Authors" },
        ...unique.map((author) => ({ id: author, name: author })),
      ];
    };

    setCategoryOptions(getCategoryOptions(posts));
    setAuthorOptions(getAuthorOptions(posts));
    setSortOptions(sort);
  }, []);

  return (
    <div className="flex flex-col items-center lg:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
      <Search
        searchValue={filterValue.searchValue || ""}
        setSearchValue={(val) =>
          onFilterChange({ ...filterValue, searchValue: val })
        }
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <Dropdown
          value={filterValue?.selectedCategory || ""}
          options={categoryOptions}
          onSelectOption={(val) =>
            onFilterChange({ ...filterValue, selectedCategory: val })
          }
        />
        <Dropdown
          value={filterValue.selectedAuthors || ""}
          options={authorOptions}
          onSelectOption={(val) =>
            onFilterChange({ ...filterValue, selectedAuthors: val })
          }
        />
        <Dropdown
          value={filterValue.selectedNews || ""}
          options={sortOptions}
          onSelectOption={(val) =>
            onFilterChange({ ...filterValue, selectedNews: val })
          }
        />
      </div>
    </div>
  );
};
