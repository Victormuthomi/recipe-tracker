import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const RandomCard = () => {
  const defaultRecipe = {
    name: "Default Pancake",
    description: "A simple and delicious pancake recipe.",
    ingredients: "Flour, Eggs, Milk, Butter, Sugar, Baking Powder, Salt",
    instructions:
      "Mix all ingredients and cook on a griddle until golden brown.",
    image: "/images/pancake.jpeg",
  };

  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (storedRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * storedRecipes.length);
      setRandomRecipe(storedRecipes[randomIndex]);
    } else {
      setRandomRecipe(defaultRecipe);
    }
  }, []);

  if (!randomRecipe) {
    return <p>Loading...</p>;
  }

  const ingredientsList = Array.isArray(randomRecipe.ingredients)
    ? randomRecipe.ingredients.join(", ")
    : randomRecipe.ingredients;

  return (
    <section className="bg-white dark:bg-gray-800 py-4">
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

          <div className="mb-4">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Instructions: {randomRecipe.instructions}
            </p>
          </div>

          {randomRecipe.image && (
            <div className="flex justify-left">
              <img
                src={randomRecipe.image}
                alt={`${randomRecipe.name} image`}
                className="w-80 rounded-md m-4 h-50 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RandomCard;
