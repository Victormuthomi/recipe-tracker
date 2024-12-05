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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm sm:max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {recipe.name}
        </h2>
        <h3 className="text-lg text-gray-600 dark:text-gray-300 mb-4">
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
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [collapsedIngredients, setCollapsedIngredients] = useState({});

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const validatedRecipes = storedRecipes.map((recipe) => ({
      ...recipe,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      showIngredients: false,
    }));

    setRecipes(validatedRecipes);
    setFilteredRecipes(validatedRecipes);

    const uniqueCategories = [
      ...new Set(validatedRecipes.map((recipe) => recipe.category)),
    ];
    setCategories(uniqueCategories);
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Recipe Management
          </h1>
          <Link
            to="/add-recipe"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add Recipe
          </Link>
        </div>

        <div className="flex space-x-4 mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search recipes"
            className="p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full sm:w-64"
          />
          <FilterRecipe categories={categories} onFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.name}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {recipe.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {recipe.category}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {recipe.ingredients}
              </p>

              {recipe.imageURL && (
                <div className="flex justify-center">
                  <img
                    src={recipe.imageURL}
                    alt={`${recipe.name} image`}
                    className="w-full m-4 rounded-md h-50 object-cover"
                  />
                </div>
              )}

              <button
                onClick={() => openViewModal(recipe)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-3 mb-3 sm:mr-3 sm:mb-0"
              >
                View
              </button>
              <button
                onClick={() => openModal(recipe)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-3 mb-3 sm:mr-2 sm:mb-0"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(recipe)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-2 sm:mb-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <EditRecipeModal
        show={modalOpen}
        onClose={closeModal}
        recipe={selectedRecipe}
        onEdit={(updatedRecipe) => {
          setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
              recipe.name === updatedRecipe.name ? updatedRecipe : recipe
            )
          );
          localStorage.setItem("recipes", JSON.stringify(recipes));
          closeModal();
        }}
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
