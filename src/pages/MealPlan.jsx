import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";
import AddMeal from '../components/AddMealDay';

const API_URL = "http://localhost:5005";

export default function MealPlan() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get( `${API_URL}/api/meals`)
      .then((response) => {

         console.log(response.data)
        setMeals(response.data);
      })
      .catch((err) => console.log(err));
  }, []); 

  return (
    <div>
    <AddMeal/>
    {meals.length > 0 &&
        meals.map((meal) => (
          <div key={meal._id}>
            <p>{meal.day}</p>
            <p>{meal.mealType}</p>
            <p>{meal.recipe.name}</p>
          </div>
        ))}
    </div>
  )
}
