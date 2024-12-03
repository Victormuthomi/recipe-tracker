import React, { useEffect, useState } from "react";

const RandomCard = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (storedRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * storedRecipes.length);
      setRandomRecipe(storedRecipes[randomIndex]);
    }
  }, []);

  // Render a loading or error state if no recipe is available
  if (!randomRecipe) {
    return (
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">
              Featured Recipe
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No recipes available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Ensure ingredients is an array before calling join
  const ingredientsList = Array.isArray(randomRecipe.ingredients)
    ? randomRecipe.ingredients.join(", ")
    : randomRecipe.ingredients; // Fallback if it's not an array

  return (
    <section className="bg-white dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">
            Featured Recipe
          </h1>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {randomRecipe.name}
            </h2>
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              {randomRecipe.category}
            </h3>
          </div>

          <div className="mb-4">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Ingredients: {ingredientsList}
            </p>
          </div>

          <div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              View Recipe Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomCard;
