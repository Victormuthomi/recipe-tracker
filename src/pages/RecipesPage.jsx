import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FilterRecipe = ({ categories, onFilter }) => {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="p-2 border rounded-md"
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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Recipe Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{recipe.name}</h2>
        <h3 className="text-lg text-gray-600 mb-4">Instructions</h3>
        <p className="text-gray-700">{recipe.instructions}</p>
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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Are you sure?</h2>
        <p className="text-gray-700 mb-4">
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

  const handleFilter = (category) => {
    let filtered = recipes;
    if (category !== "") {
      filtered = recipes.filter((recipe) => recipe.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    let filtered = recipes;
    if (query) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  };

  const toggleIngredients = (recipeName) => {
    setCollapsedIngredients((prevState) => ({
      ...prevState,
      [recipeName]: !prevState[recipeName],
    }));
  };

  return (
    <>
      <div className="py-8">
        <h1 className="text-center text-4xl font-bold text-indigo-800 mb-4">
          Recipes
        </h1>

        <div className="flex justify-between items-center mb-6 ml-6">
          <FilterRecipe categories={categories} onFilter={handleFilter} />

          <input
            type="text"
            placeholder="Search Recipes"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border rounded-md w-72 mr-6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.name}
              className="w-72 bg-gray-100 shadow-md rounded-lg mb-6 mx-4 p-4"
            >
              <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
              <p className="text-gray-700 mb-2">Category: {recipe.category}</p>

              <div className="mb-4">
                <button
                  onClick={() => toggleIngredients(recipe.name)}
                  className="text-blue-600 hover:bg-blue-100 rounded-full py-2 px-4 w-full mb-4"
                >
                  {collapsedIngredients[recipe.name]
                    ? "Hide Ingredients"
                    : "Show Ingredients"}
                </button>
                {collapsedIngredients[recipe.name] && (
                  <ul className="list-disc pl-6">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-700">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => openViewModal(recipe)}
                  className="text-blue-600 hover:bg-blue-100 rounded-full py-2 px-4 w-full"
                >
                  View More
                </button>
                <button
                  onClick={() => openModal(recipe)}
                  className="text-blue-600 hover:bg-blue-100 rounded-full py-2 px-4 w-full"
                >
                  Edit Recipe
                </button>
                <button
                  onClick={() => openDeleteModal(recipe)}
                  className="text-red-600 hover:bg-red-100 rounded-full py-2 px-2 w-full"
                >
                  Delete Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditRecipeModal
        show={modalOpen}
        onClose={closeModal}
        recipe={selectedRecipe}
        onEdit={(updatedRecipe) => {
          const updatedRecipes = recipes.map((recipe) =>
            recipe.name === updatedRecipe.name ? updatedRecipe : recipe
          );
          setRecipes(updatedRecipes);
          setFilteredRecipes(updatedRecipes);
          localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
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
        onDelete={handleDelete}
        recipeName={recipeToDelete?.name}
      />
    </>
  );
};

export default RecipesPage;
