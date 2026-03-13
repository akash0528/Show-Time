import { Search } from "lucide-react"; // icon ke liye (lucide-react install kar)

import { useSearch } from "../src/Context/SearchProvider";

const SearchBar = () => {
  const { query, setQuery } = useSearch();

  const SearchHandle = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="flex items-center w-full md:w-100 max-w-full mb-1 bg-white border border-gray-300 rounded-lg shadow-sm px-2 py-1 md:py-2">
      <Search className="text-gray-500 mr-2 shrink-0" size={20} />
      <input
        type="text"
        placeholder="Search for events, movies and Activity"
        className="flex-1 w-full outline-none text-sm md:text-base text-gray-700 placeholder-gray-400 "
        onChange={SearchHandle}
        value={query}
      />
    </div>
  );
};

export default SearchBar;
