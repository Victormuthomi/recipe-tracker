import React, { useEffect, useState } from "react";

const RandomCard = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // If there are any recipes in localStorage, select a random one
    if (storedRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * storedRecipes.length);
      setRandomRecipe(storedRecipes[randomIndex]);
    }
  }, []);

  if (!randomRecipe) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-blue-500 mb-2">
              Featured Recipe
            </h1>
            <p className="text-lg text-gray-500">No recipes available.</p>
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
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">
            Featured Recipe
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {randomRecipe.name}
          </h2>
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            {randomRecipe.category}
          </h3>
          <p className="text-lg text-gray-500 mb-4">
            Ingredients: {ingredientsList}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RandomCard;
