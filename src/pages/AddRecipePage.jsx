import { useState } from "react"; // Importing the useState hook for managing component state
import RecipeUploader from "../components/RecipeUploader";

const AddRecipePage = () => {
  // Defining state variables for form fields
  const [name, setName] = useState(""); // Recipe name
  const [description, setDescription] = useState(""); // Recipe description
  const [ingredients, setIngredients] = useState(""); // Ingredients input
  const [instructions, setInstructions] = useState(""); // Cooking instructions
  const [category, setCategory] = useState(""); // Recipe category
  const [imageURL, setImageURL] = useState(""); // URL for the recipe image

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Splitting ingredients string into an array and trimming whitespace
    const ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

    // Creating a recipe object with form inputs
    const recipe = {
      name,
      description,
      ingredients: ingredientsArray,
      instructions,
      category,
      imageURL,
    };

    // Retrieving existing recipes from localStorage or initializing as an empty array
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    // Adding the new recipe to the list of existing recipes
    const updatedRecipes = [...existingRecipes, recipe];
    // Saving the updated list of recipes to localStorage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Resetting the form fields after successful submission
    setName("");
    setDescription("");
    setIngredients("");
    setInstructions("");
    setCategory("");
    setImageURL("");

    alert("Recipe added successfully!"); // Displaying a success message
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      {/* Form to add a recipe */}
      <form
        onSubmit={handleSubmit} // Handling form submission
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 py-6 max-w-md w-full"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Add Recipe
        </h2>

        {/* Recipe Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded-md w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            placeholder="Enter the Recipe name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} // Updating the name state
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="border rounded-md w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            placeholder="Enter the Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Updating the description state
          />
        </div>

        {/* Ingredients Input */}
        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="4"
            className="border rounded-md w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            placeholder="Enter the ingredients"
            required
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)} // Updating the ingredients state
          ></textarea>
        </div>

        {/* Instructions Input */}
        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows="4"
            className="border rounded-md w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            placeholder="Enter the instructions"
            required
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)} // Updating the instructions state
          ></textarea>
        </div>

        {/* Category Select Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Updating the category state
            className="border rounded-md w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
          >
            <option value="" disabled defaultValue>
              Select a category
            </option>
            <option value="Dessert">Dessert</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        {/* Image URL Input */}
        <div className="mb-4">
          <label
            htmlFor="image-url"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="border rounded-md w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            placeholder="https://example.com/image.jpg"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)} // Updating the imageURL state
            pattern="https?://.*"
            title="Enter a valid URL starting with http:// or https://"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline transition"
            type="submit"
          >
            Add Recipe
          </button>
          <div>
            <h2 className="text-slate-100 text-bold mt-3 text-center">Or</h2>
          </div>
        </div>
        <RecipeUploader />
      </form>
    </section>
  );
};

export default AddRecipePage; // Exporting the AddRecipePage component
