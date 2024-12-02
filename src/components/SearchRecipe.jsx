import { useState } from "react";

const SearchRecipe = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="mb-8 max-w-lg mx-auto">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 border-indigo-500 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchRecipe;
