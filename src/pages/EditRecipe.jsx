import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import service from '../api/service';


const API_URL = "http://localhost:5005";


export default function EditRecipe() {

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState(0);

 

  const navigate =  useNavigate();

  const { recipeId } = useParams();


  useEffect(() => {
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`)
      .then((response) => {
        const oneRecipe = response.data;
        setName(oneRecipe.name);
        setIngredients(oneRecipe.ingredients);
        setImageUrl(oneRecipe.imageUrl);
        setInstruction(oneRecipe.instruction);
        setCookingTime(oneRecipe.cookingTime);
      })
      .catch((error) => console.log(error));
  }, [recipeId]);


  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, imageUrl, instruction, ingredients, cookingTime };
  
    // Get the token from the localStorage
    // const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers   
    axios
      .put(
        `${API_URL}/api/recipes/${recipeId}`,
        requestBody,
        // { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/recipes/${recipeId}`)
      });
  };
  
  
  const deleteRecipe = () => {
    // Get the token from the localStorage
    // const storedToken = localStorage.getItem('authToken');      
    
    // Send the token through the request "Authorization" Headers   
    axios
      .delete(
        `${API_URL}/api/recipes/${recipeId}`,
        // { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };  


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <label>Image:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <img src={imageUrl} alt="recipe" />
        <label>Instruction:</label>
        <input type="text" name="instruction" value={instruction} onChange={e => setInstruction(e.target.value)} />
        <label>Ingredients:</label>
        <input type="text" name="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <label>Cooking Time:</label>
        <input type="text" name="cookingTime" value={cookingTime} onChange={e => setCookingTime(e.target.value)} />
        <button type="submit">Update Recipe</button>
      </form>
      <button onClick={deleteRecipe}>Delete Recipe</button>
    </div>

   
  
);
}
