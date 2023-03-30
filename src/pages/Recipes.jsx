import React from 'react'
import AddRecipe from '../components/AddRecipe'
import { useState, useEffect } from "react";
import service from "../api/service";
import '../css/styles.css'
import { Link } from 'react-router-dom';
 

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
             <div className='detail-link'><Link className='linkDetail' to={`/recipes/${recipe._id}`}> Detail</Link></div>
            </div>
            
          ))}
      </div>
    </div>
  )}
