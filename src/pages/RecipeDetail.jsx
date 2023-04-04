import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function RecipeDetail (props) {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  
  
  const getRecipe = () => {
    // Get the token from the localStorage
     const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
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
    <div className="recipeDetails">

      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          
          <div className='recipeDiv'>
          <img className='imageDetail' src={recipe.imageUrl} alt="" />
            <div className='recipeContent'>
          <p> Instructions: {recipe.instruction}</p>
          <p>Ingredients: {recipe.ingredients}</p>
          <p>Cooking Time: {recipe.cookingTime}</p>
          </div>
          </div>
        </>
      )}
      
      <Link to="/recipes">
        <button className='recipebtn'>Back to recipes</button>
      </Link>
          
      <Link to={`/recipes/edit/${recipeId}`}>
        <button className='recipebtn'>Edit Recipe</button>
      </Link>
      
    </div>
  );
}
export default RecipeDetail
 
