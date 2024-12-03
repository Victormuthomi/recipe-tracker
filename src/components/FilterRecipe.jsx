import { useState } from "react";

const FilterRecipe = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <div className="mb-6">
      <h1 className="">Filter by category</h1>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="border-2 border-indigo-500 rounded-md px-4 py-2"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterRecipe;
