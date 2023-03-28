import React from 'react'
import AddRecipe from '../components/AddRecipe'
import { useState, useEffect } from "react";
import service from "../api/service";
import '../css/styles.css'
 

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  
  const refreshRecipes = () => {
    service.getRecipes()
    .then((data) => {
      // console.log("data", data);
      setRecipes(data);
    })
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
   refreshRecipes()
  }, []); 

  return (
    <div>
      <AddRecipe refreshRecipes={refreshRecipes}/>
      <div className="recipe-list">
        {recipes &&
          recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-container">
              <h3>{recipe.name}</h3>
              <img src={recipe.imageUrl} alt="recipe" />
              {/* <p>Ingredients:</p>
              <textarea>{recipe.ingredients}</textarea>
              <p>Instruction:</p>
              <textarea>{recipe.instruction}</textarea>
              <p>{recipe.cookingTime}</p> */}
            </div>
          ))}
      </div>
    </div>
  )}
