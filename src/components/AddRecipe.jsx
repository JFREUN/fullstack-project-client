import React from "react";
import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState(0);

  const handleSubmit = (e) => {
    // <== ADD
    e.preventDefault();

    const requestBody = { name, imageUrl, instruction, ingredients, cookingTime };

    axios
      .post(`${API_URL}/api/recipes`, requestBody)
      .then((response) => {
        setName("");
        setImageUrl("");
        setInstruction("");
        setIngredients("");
        setCookingTime("");
        console.log(imageUrl)
      })
      .catch((error) => console.log(error));
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <label>Image:</label>
        <input type="file" name="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <label>Instruction:</label>
        <input type="text" name="instruction" value={instruction} onChange={e => setInstruction(e.target.value)} />
        <label>Ingredients:</label>
        <input type="text" name="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <label>Cooking Time:</label>
        <input type="text" name="cookingTime" value={cookingTime} onChange={e => setCookingTime(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
