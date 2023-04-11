import React from "react";
import { useState, useEffect } from "react";
import "../css/styles.css";

import axios from "axios";
import "../css/styles.css";
import ShoppingList from "../components/ShoppingList";
import saladIcon from "../images/Salad.svg"


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function FridgePage() {
  const [ingredients, setIngredients] = useState([]);
  const [inStock, setInStock] = useState(true);

  const storedToken = localStorage.getItem("authToken");

  const refreshIngredients = () => {
    axios
      .get(`${API_URL}/api/ingredients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {

        const ingredientCopy = response.data.splice(0, 20);
        setIngredients(ingredientCopy);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshIngredients();
  }, []);


  const handleInstock = (id) => {
    const requestBody = {
      inStock,
    };

    ingredients.map((ingredient) => {
      if(ingredient._id === id && ingredient.inStock === true){
        return setInStock(false);
      } else if ( ingredient._id === id && ingredient.inStock === false) {
        return setInStock(true);
      }
    });

    axios
      .put(`${API_URL}/api/ingredients/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .catch((err) => console.log("This is an ingredient update error: ", err));
   
    refreshIngredients()
  };

 

  return (
    <div className="fridgeSection">
      
        <ShoppingList
          ingredients={ingredients}
          refreshIngredients={refreshIngredients}
          handleInstock={handleInstock}
        ></ShoppingList>
     
      <div className="ingredientsContainer">
        <h2>Groceries</h2>
        <div className="ingredientsList">
        
       
            {
              ingredients.map((ingredient) => (
              
                <div className="ingredientsDiv" key={ingredient._id}>
                <img src={saladIcon} alt="" />
                  <p>{ingredient.name}</p>
                  
                    {ingredient.inStock && (
                      <button
                        onClick={() => handleInstock(ingredient._id)}
                        style={{ backgroundColor: "#5C8D89" }}
                      >
                        In Stock
                      </button>
                    )}
                    {!ingredient.inStock && (
                      <button
                        onClick={() => handleInstock(ingredient._id)}
                        style={{ backgroundColor: "#89375F" }}
                      >
                        Out of Stock
                      </button>
                    )}
                  
                </div>
              ))}
        
        </div>

      </div>
    </div>
  );
}
