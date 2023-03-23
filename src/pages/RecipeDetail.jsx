import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";


function RecipeDetail (props) {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  
  
  const getRecipe = () => {
    // Get the token from the localStorage
    // const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/recipes/${recipeId}`,
        // { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getRecipe();
  }, [] );

  
  return (
    <div className="RecipeDetails">
      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <img src={recipe.imageUrl} alt="" />
          <p>{recipe.instruction}</p>
          <p>{recipe.ingredients}</p>
          <p>{recipe.cookingTime}</p>
        </>
      )}

      
      

      <Link to="/recipes">
        <button>Back to recipes</button>
      </Link>
          
      <Link to={`/recipes/edit/${recipeId}`}>
        <button>Edit Recipe</button>
      </Link>
      
    </div>
  );
}
export default RecipeDetail
 
