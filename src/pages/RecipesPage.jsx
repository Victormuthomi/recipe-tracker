import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Modal = ({ show, onClose, recipe }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{recipe.name}</h2>
        <p className="text-gray-700 mb-4">{recipe.instructions}</p>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const validatedRecipes = storedRecipes.map((recipe) => ({
      ...recipe,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [], // Make sure ingredients is an array
      showIngredients: false,
    }));
    setRecipes(validatedRecipes);

    console.log("Fetched Recipes:", validatedRecipes);
  }, []);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <>
      <div className="py-8">
        <h1 className="text-center text-4xl font-bold text-indigo-800">
          Recipes
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {recipe.name}
                </h2>
                <span className="inline-block text-sm font-semibold text-indigo-500 mb-2">
                  {recipe.category}
                </span>

                <div>
                  <button
                    onClick={() => {
                      const updatedRecipes = [...recipes];
                      updatedRecipes[index].showIngredients =
                        !updatedRecipes[index].showIngredients;
                      setRecipes(updatedRecipes);
                    }}
                    className="text-indigo-500 hover:text-indigo-600 mb-2"
                  >
                    {recipe.showIngredients
                      ? "Hide Ingredients"
                      : "Show Ingredients"}
                  </button>
                  {recipe.showIngredients && recipe.ingredients.length > 0 && (
                    <p className="text-gray-600 mb-4">
                      {recipe.ingredients.join(", ")}
                    </p>
                  )}
                  {recipe.showIngredients &&
                    recipe.ingredients.length === 0 && (
                      <p className="text-gray-600 mb-4">
                        No ingredients available
                      </p>
                    )}
                </div>

                <button
                  onClick={() => openModal(recipe)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md w-full"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedRecipe && (
        <Modal show={modalOpen} onClose={closeModal} recipe={selectedRecipe} />
      )}
    </>
  );
};

export default RecipesPage;
