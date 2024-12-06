import defaultRecipes from "../assets/data/defaultRecipes.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FilterRecipe = ({ categories, onFilter }) => {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-auto"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

const EditRecipeModal = ({ show, onClose, recipe, onEdit }) => {
  if (!show || !recipe) return null;

  const [name, setName] = useState(recipe.name);
  const [category, setCategory] = useState(recipe.category);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(", "));
  const [instructions, setInstructions] = useState(recipe.instructions);

  useEffect(() => {
    setName(recipe.name);
    setCategory(recipe.category);
    setIngredients(recipe.ingredients.join(", "));
    setInstructions(recipe.instructions);
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...recipe,
      name,
      category,
      ingredients: ingredients.split(", "),
      instructions,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm sm:max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Edit Recipe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Recipe Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewRecipeModal = ({ show, onClose, recipe }) => {
  if (!show || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-indigo-200 dark:bg-gray-800 text-center p-4 rounded-lg shadow-lg max-w-sm sm:max-w-lg w-full">
        <h2 className="text-xl font-bold text-center text-indigo-800 dark:text-white mb-4">
          {recipe.name}
        </h2>
        <h3 className="text-lg text-gray-800 dark:text-gray-300 mb-4">
          Instructions
        </h3>
        <p className="text-gray-700 dark:text-gray-200">
          {recipe.instructions}
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ show, onClose, onDelete, recipeName }) => {
  if (!show || !recipeName) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm sm:max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Are you sure?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You are about to delete "{recipeName}". This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={onDelete}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));

    if (!storedRecipes || storedRecipes.length === 0) {
      // Only set defaultRecipes if there's no data in localStorage
      localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
      setRecipes(defaultRecipes);
      setFilteredRecipes(defaultRecipes);

      const uniqueCategories = [
        ...new Set(defaultRecipes.map((recipe) => recipe.category)),
      ];
      setCategories(uniqueCategories);
    } else {
      const validatedRecipes = storedRecipes.map((recipe) => ({
        ...recipe,
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : [],
      }));
      setRecipes(validatedRecipes);
      setFilteredRecipes(validatedRecipes);

      const uniqueCategories = [
        ...new Set(validatedRecipes.map((recipe) => recipe.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, []);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  const openViewModal = (recipe) => {
    setSelectedRecipe(recipe);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedRecipe(null);
  };

  const openDeleteModal = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setRecipeToDelete(null);
  };

  const deleteRecipe = () => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe !== recipeToDelete)
    );
    setFilteredRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe !== recipeToDelete)
    );
    localStorage.setItem(
      "recipes",
      JSON.stringify(
        filteredRecipes.filter((recipe) => recipe !== recipeToDelete)
      )
    );
    setDeleteModalOpen(false);
  };

  const handleFilter = (category) => {
    if (category) {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.category === category)
      );
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleEditRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-auto"
        />
        <Link
          to="/add-recipe"
          className="bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Add New Recipe
        </Link>
      </div>
      <div className="flex justify-center mb-3">
        <FilterRecipe categories={categories} onFilter={handleFilter} />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 rounded-md bg-indigo-100 dark:bg-gray-800 shadow-md"
          >
            <h3 className="text-xl font-semibold text-center text-indigo-800 dark:text-white mb-4">
              {recipe.name}
            </h3>

            <p className="text-gray-700 text-center font-bold dark:text-gray-300 mb-4">
              {recipe.category}
            </p>

            <p className="text-gray-800 text-center dark:text-gray-300 mb-4">
              {recipe.instructions}
            </p>

            {recipe.image && (
              <div className="flex justify-center">
                <img
                  src={recipe.image}
                  alt={`${recipe.name} image`}
                  className="w-50 h-50 rounded-md m-3  object-center"
                />
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => openViewModal(recipe)}
                className="bg-blue-500 text-white py-2 px-4 pl-5 rounded-md"
              >
                View
              </button>
              <button
                onClick={() => openModal(recipe)}
                className="bg-yellow-500 py-2 px-4 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(recipe)}
                className="bg-red-500 text-white py-2 px-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditRecipeModal
        show={modalOpen}
        onClose={closeModal}
        recipe={selectedRecipe}
        onEdit={handleEditRecipe}
      />
      <ViewRecipeModal
        show={viewModalOpen}
        onClose={closeViewModal}
        recipe={selectedRecipe}
      />
      <DeleteConfirmationModal
        show={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={deleteRecipe}
        recipeName={recipeToDelete?.name}
      />
    </div>
  );
};

export default RecipesPage;
