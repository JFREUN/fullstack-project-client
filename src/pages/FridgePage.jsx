import React from "react";
import { useState, useEffect } from "react";
import "../css/styles.css";

import axios from "axios";
import "../css/styles.css";
import ShoppingList from "../components/ShoppingList";


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
        <table className="ingredientsList">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {
              ingredients.map((ingredient) => (
              
                <tr key={ingredient._id}>
                  <td>{ingredient.name}</td>
                  <td>
                    {ingredient.inStock && (
                      <button
                        onClick={() => handleInstock(ingredient._id)}
                        style={{ backgroundColor: "#5C8D89" }}
                      >
                        Yes
                      </button>
                    )}
                    {!ingredient.inStock && (
                      <button
                        onClick={() => handleInstock(ingredient._id)}
                        style={{ backgroundColor: "#89375F" }}
                      >
                        No
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
