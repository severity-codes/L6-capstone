import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { RecipesContext } from "../context/RecipeProvider";
import RecipeForm from "./RecipeForm.jsx";
import RecipeList from "./RecipeList.jsx";
import ppic from "../assets/ppic.png";
import "./profile.css";

export default function Combined() {
  const { user, updateUser } = useContext(UserContext);
  const { recipes, addRecipe, deleteRecipe } = useContext(RecipesContext);
  const [sortedRecipes, setSortedRecipes] = useState([]);

  useEffect(() => {
    // Create a new array to sort, to avoid mutating the original recipes array
    const sorted = recipes.sort((a, b) => b.likes.length - a.likes.length);
    setSortedRecipes(sorted);
  }, [recipes]);

  function handleUpdateName() {
    const updatedName = prompt("Enter your updated name:");
    if (updatedName) {
      updateUser({ ...user, name: updatedName });
    }
  }

  const {
    user: { username, _id },
    token,
  } = useContext(UserContext);

  const firstLetter = token && username ? username.charAt(0).toUpperCase() : "";
  const usernameCased = username
    ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    : "";

  return (
    <div className="combined-container">
      <div className="profile-section">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="user-info">
          <h2>User Information</h2>
          <div>
            <p>Name: {user.name}</p>
            <img src={ppic} alt="Profile" className="profile-image" />
          </div>
        </div>
        <div className="sorted-recipes">
          <h2>Sorted Recipes</h2>
          <ul>
            {sortedRecipes.map((recipe) => (
              <li key={recipe._id}>
                <div>Title: {recipe.title}</div>
                <div>Ingredients: {recipe.ingredients} </div>
                <div>Instructions: {recipe.instructions}</div>
                <div>Total Likes: {recipe.likes.length}</div>
              </li>
            ))}
          </ul>
        </div>
        <button className="update-name-btn" onClick={handleUpdateName}>
          Update Name
        </button>
      </div>
      <div className="post-section">
        <div className="post">
          <div className="profile-pic">{firstLetter}</div>
          <div className="post-wrapper">
            <h3 className="recipe-question">
              Any new recipes to post?, {usernameCased}?
            </h3>
            <RecipeForm addRecipe={addRecipe} />
            <RecipeList deleteRecipe={deleteRecipe} />
          </div>
        </div>
        <div className="recipes-wrapper">
          <RecipeList userId={_id} />
        </div>
      </div>
    </div>
  );
}
