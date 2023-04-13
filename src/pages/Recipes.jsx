import React from "react";
import AddRecipe from "../components/AddRecipe";
import { useState, useEffect, useContext } from "react";
import service from "../api/service";
import "../css/styles.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import recipeImage from "../images/recipe-illustration.png";
import { AuthContext } from "./../context/auth.context";
import chefPic from "../images/chef pic.png"

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  const { user } = useContext(AuthContext);

  const refreshRecipes = () => {
    service
      .getRecipes()
      .then((data) => {
        // console.log("data", data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshRecipes();
  }, []);

  return (
    <div>
      <div className="welcome-recipe-wrapper">
        {" "}
        <img src={recipeImage} alt="" />
        <h1>
          Welcome <span className="welcome-recipe-span"> {user.name}</span>!
        </h1>
      </div>
      <div>
        <p className="welcome-recipe-p">
          Add your recipe and have a nice week!
        </p>
      </div>
      

      <AddRecipe refreshRecipes={refreshRecipes} />

      <div className="recipe-list-container">
        {recipes.map((recipe) => (
          <div key={recipe._id}  className="recipe-list">
            <div className="recipe-container">
              <h3>{recipe.name}</h3>
              <img src={recipe.imageUrl} alt="recipe" />             
              <div className="detail-link">
                <Link className="linkDetail" to={`/recipes/${recipe._id}`}>
                  {" "}
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
