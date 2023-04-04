import React from 'react'
import { useState, useEffect } from "react";
import '../css/styles.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
 
const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

export default function FridgePage() {
  const [ingredients, setIngredients] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const refreshIngredients = () => {
    axios.get(`${API_URL}/api/ingredients`, { headers: { Authorization: `Bearer ${storedToken}` }} )
    .then((response) => {
      // console.log("data", data);
      setIngredients(response.data);
    })
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
   refreshIngredients()
  }, []); 

  return (
    <div>
      
      <div className="ingredients-list">
        <ul>
        {ingredients &&
          ingredients.map((ingredient) => (          
              <li key={ingredient._id}>{ingredient.name}</li>                      
          ))}
          </ul>
      </div>
    </div>
  )}
