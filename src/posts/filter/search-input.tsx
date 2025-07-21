import { Input } from "@/components/ui/input.tsx";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  searchValue: string;
  setSearchValue: (val: string) => void;
}

const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  return (
    <div className="flex-1">
      <div className="relative flex flex-row items-center">
        <SearchIcon
          className="absolute top-3 left-3"
          color="grey"
          size={"15px"}
        />
        <Input
          className="pl-10"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search posts..."
        />
      </div>
    </div>
  );
};

export default Search;
