import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../css/styles.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function RecipeDetail(props) {
  const [recipe, setRecipe] = useState("");
  const { recipeId } = useParams();

  const getRecipe = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="recipeDetails">
      {recipe && (
        <>
          <h1>{recipe.name}</h1>

          <div className="recipeDiv">
            <img className="imageDetail" src={recipe.imageUrl} alt="" />
            <div className="recipeContent">
              <h3>Instructions: </h3>
              <p>{recipe.instruction}</p>

              <div >
              <h3>Ingredients</h3>
              {recipe.ingredients.map((ingredient) => {
                   let ingredientColor ;
                    ingredient.inStock ? ingredientColor = "green" : ingredientColor = "red";
                                          
                    return (
                      <div
                        key={ingredient._id}
                        className="ingredient-list-detail"
                      >
                        <li style={{ color: ingredientColor }}>
                          {ingredient.name}
                        </li>
                      </div>
                    );
                  })}


              </div>
              <h3>Cooking Time: </h3>

              <p>{recipe.cookingTime}</p>
            </div>
          </div>
        </>
      )}

      <Link to="/recipes">
        <button className="recipebtn">Back to recipes</button>
      </Link>

      <Link to={`/recipes/edit/${recipeId}`}>
        <button className="recipebtn">Edit Recipe</button>
      </Link>
    </div>
  );
}
export default RecipeDetail;