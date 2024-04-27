import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track selected recipe

  const fetchLatestRecipesAndCategories = async () => {
    try {
      const latestResponse = await axios.get(
        "https://themealdb.p.rapidapi.com/latest.php",
        {
          headers: {
            "X-RapidAPI-Key": "YOUR_API_KEY",
            "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
          },
        }
      );

      const categoriesResponse = await axios.get(
        "https://themealdb.p.rapidapi.com/categories.php",
        {
          headers: {
            "X-RapidAPI-Key": "YOUR_API_KEY",
            "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
          },
        }
      );

      setLatestRecipes(latestResponse.data.meals);
      setCategories(categoriesResponse.data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Function to handle click on a recipe
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Function to handle closing the recipe details
  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  // Rest of your code remains unchanged

  return (
    <div className="home">
      {/* Your search form here */}

      {/* Latest recipes section */}
      <div className="latest-recipes">
        <h2>Latest Recipes</h2>
        <ul>
          {latestRecipes.map((recipe) => (
            <li key={recipe.idMeal} onClick={() => handleRecipeClick(recipe)}>
              <div>{recipe.strMeal}</div>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </li>
          ))}
        </ul>
      </div>

      {/* Categories section */}
      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.idCategory}>{category.strCategory}</li>
          ))}
        </ul>
      </div>

      {/* Search results section */}
      {/* Similar to latest recipes section but for search results */}

      {/* Modal for displaying recipe details */}
      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseRecipeDetails}>
              &times;
            </span>
            <h2>{selectedRecipe.strMeal}</h2>
            {/* Display more details here, e.g., ingredients, instructions */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
