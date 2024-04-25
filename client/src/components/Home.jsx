/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from "react";
import RecipeForm from './RecipeForm.jsx'
import RecipeList from './RecipeList.jsx'
import { UserContext } from "../context/UserProvider.jsx";
import { RecipesContext } from "../context/RecipeProvider.jsx";
import "./home.css";

const Home = () => {
  const {
    user: { username, _id },
    token,
  } = useContext(UserContext);

  const { addRecipe } = useContext(RecipesContext);
    const { deleteRecipe } = useContext(RecipesContext);

  // user data
  const firstLetter = token && username ? username.charAt(0).toUpperCase() : "";
  const usernameCased = username
    ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    : "";

  return (
    <div className="home">
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
        <RecipeList userId={ _id} />
      </div>
    </div>
  );
};

export default Home;
