import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const { mealId } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const mealData = response.data.meals[0];
        setMealDetails(mealData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        setLoading(false);
      }
    };
    fetchMealDetails();
  }, [mealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mealDetails) {
    return <div>No meal details found</div>;
  }

  return (
    <div>
      <h2>{mealDetails.strMeal}</h2>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <p>{mealDetails.strInstructions}</p>
    </div>
  );
};

export default MealDetails;