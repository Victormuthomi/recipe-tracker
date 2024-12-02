import { useState } from "react";

const AddRecipePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(""); 
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

    const recipe = {
      name,
      description,
      ingredients: ingredientsArray, 
      instructions,
      category,
      imageURL,
    };

    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const updatedRecipes = [...existingRecipes, recipe];

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    
    setName("");
    setDescription("");
    setIngredients("");
    setInstructions("");
    setCategory("");
    setImageURL("");

    alert("Recipe added successfully!");
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Recipe
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded-md w-full py-2 px-3 text-gray-700"
            placeholder="Enter the Recipe name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="border rounded-md w-full py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="4"
            className="border rounded-md w-full py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the ingredients"
            required
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows="4"
            className="border rounded-md w-full py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the instructions"
            required
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md w-full py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
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

        <div className="mb-4">
          <label
            htmlFor="image-url"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image-url"
            name="image-url"
            className="border rounded-md w-full py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/image.jpg"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline transition"
            type="submit"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddRecipePage;
