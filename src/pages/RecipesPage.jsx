import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FilterRecipe = ({ categories, onFilter }) => {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
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

  const handleDelete = () => {
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.name !== recipeToDelete.name
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    closeDeleteModal();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        recipe.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleFilter = (category) => {
    if (category) {
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const toggleIngredientsCollapse = (recipeName) => {
    setCollapsedIngredients((prevState) => ({
      ...prevState,
      [recipeName]: !prevState[recipeName],
    }));
  };

  const handleEdit = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.name === updatedRecipe.name ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by recipe name or category..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <FilterRecipe categories={categories} onFilter={handleFilter} />
      </div>

      <div className="mb-6">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <li
                key={recipe.name}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Category: {recipe.category}
                </p>
                <div>
                  <button
                    onClick={() => toggleIngredientsCollapse(recipe.name)}
                    className="text-indigo-500"
                  >
                    {collapsedIngredients[recipe.name]
                      ? "Hide Ingredients"
                      : "Show Ingredients"}
                  </button>
                  {collapsedIngredients[recipe.name] && (
                    <ul className="list-disc pl-6 mt-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="text-gray-700 dark:text-gray-200"
                        >
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => openViewModal(recipe)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openModal(recipe)}
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(recipe)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <EditRecipeModal
        show={modalOpen}
        onClose={closeModal}
        recipe={selectedRecipe}
        onEdit={handleEdit}
      />
      <ViewRecipeModal
        show={viewModalOpen}
        onClose={closeViewModal}
        recipe={selectedRecipe}
      />
      <DeleteConfirmationModal
        show={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        recipeName={recipeToDelete?.name}
      />
    </div>
  );
};

export default RecipesPage;
