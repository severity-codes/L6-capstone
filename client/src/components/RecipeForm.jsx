/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {RecipesContext} from '../context/RecipeProvider'

// Function component for creating and submitting recipes
export default function RecipeForm() {
  const { addRecipe } = useContext(RecipesContext);
  const initInputs = {
    title: "",
    ingredients: "",
   instructions: "",
    description: "",
    imgUrl: "",
  };

  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

function handleSubmit(e) {
  e.preventDefault();
  addRecipe(inputs); // 'inputs' is the state holding form data
  setInputs(initInputs); // Reset form
}

  const { title, description, imgUrl, instructions, ingredients } = inputs;
  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="ingredients"
        value={ingredients}
        onChange={handleChange}
        placeholder="Ingredients"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="instructions"
        value={instructions}
        onChange={handleChange}
        placeholder="Instructions"
      />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url"
      />

      <button>
        Add Recipe
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
}
