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
  <table className="meal-table">
      <thead>
      <th>Day</th>
      <th>Recipe</th>
      <th>Meal Type</th>
      </thead>
      <tbody>
        {meals.map((meal) => (
          <tr key={meal._id}>
            <td>
            <td>{meal.day}</td>
            <td>{meal.recipe.name}</td>
            <td>{meal.mealType}</td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
  </div>
);
}