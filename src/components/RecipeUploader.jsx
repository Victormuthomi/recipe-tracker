import React, { useState } from "react";

const RecipeUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleFileProcessing = () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const reader = new FileReader();

    // File reading logic
    reader.onload = (e) => {
      const content = e.target.result;

      if (file.type === "application/json") {
        try {
          const recipesFromFile = JSON.parse(content);
          const existingRecipes =
            JSON.parse(localStorage.getItem("recipes")) || [];
          const updatedRecipes = [...existingRecipes, ...recipesFromFile];

          localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
          alert("Recipes added successfully!");
        } catch (error) {
          alert(
            "Error processing JSON file. Please ensure it contains valid JSON."
          );
        }
      } else if (file.type === "text/plain") {
        // Handle .txt file content
        alert(`Text file content:\n\n${content}`);
      } else if (file.type === "application/pdf") {
        alert(
          "PDF files cannot be previewed here, but they were uploaded successfully."
        );
      } else if (
        file.name.endsWith(".docx") // DOCX files
      ) {
        alert("DOCX files are uploaded but require specialized processing.");
      } else {
        alert("Unsupported file type. Please upload a valid file.");
      }

      setFile(null); // Reset file input
    };

    if (file.type === "application/pdf" || file.name.endsWith(".docx")) {
      alert(
        "Currently, only JSON and TXT files are fully processed. Others are uploaded for reference."
      );
    }

    reader.readAsText(file); // Read file content as text
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="file-upload"
        className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
      >
        Upload Recipe File
      </label>
      <input
        type="file"
        id="file-upload"
        className="block w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700 border rounded-md py-2 px-3"
        accept=".json,.txt,.pdf,.docx" // Restricting to specified file types
        onChange={handleFileUpload}
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-3 rounded-md w-full focus:outline-none focus:shadow-outline transition"
        type="button"
        onClick={handleFileProcessing}
      >
        Process File
      </button>
    </div>
  );
};

export default RecipeUploader;
