import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const fetchLatestRecipes = async () => {
    try {
      const response = await axios.get("/api/meals/search", {
        params: { f: searchQuery }, // Pass the search query as a parameter
      });
      const data = response.data;
      console.log("API Response:", data);
      if (data && data.meals) {
        setLatestRecipes(data.meals);
      } else {
        setLatestRecipes([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching latest recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestRecipes();
  }, []);

  return (
    <div className="home">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchLatestRecipes();
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for meals..."
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {Array.isArray(latestRecipes) &&
            latestRecipes.map((recipe) => (
              <li key={recipe.idMeal}>
                <div>{recipe.strMeal}</div>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
