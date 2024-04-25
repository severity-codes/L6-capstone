/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { RecipesContext } from "../context/RecipeProvider";
import ppic from "../assets/ppic.png";
import "./profile.css";

export default function Profile() {
  const { user, updateUser } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);
  const [sortedRecipes, setSortedRecipes] = useState([]);

  useEffect(() => {
    // Create a new array to sort, to avoid mutating the original recipes array
    const sorted = recipes.sort((a, b) => b.likes.length - a.likes.length);
    setSortedRecipes(sorted);
  }, [recipes]);

function handleUpdateName (){
    const updatedName = prompt("Enter your updated name:");
    if (updatedName) {
      updateUser({ ...user, name: updatedName });
    }
  };

  return (
    <div className="profile-container">
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
  );
}
