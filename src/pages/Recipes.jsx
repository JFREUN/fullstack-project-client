import React from 'react'
import AddRecipe from '../components/AddRecipe'
import { useState, useEffect } from "react";
import service from "../api/service";
 

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    service.getRecipes()
      .then((data) => {
        // console.log("data", data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []); 

  return (
    <div>
    <AddRecipe/>
    {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id}>
            <p>{recipe.name}</p>
            <img src={recipe.imageUrl} alt="recipe" width="200" />
          </div>
        ))}
    </div>
  )
}
