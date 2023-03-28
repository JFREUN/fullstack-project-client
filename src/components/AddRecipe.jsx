import React from "react";
import { useState,useContext } from "react";
import service from "../api/service";
import { AuthContext } from "./../context/auth.context";



export default function AddRecipe(props) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const {user} = useContext(AuthContext);
  console.log(user)
  
  

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
 

  const handleSubmit = (e) => {
    e.preventDefault();
 
    service
      .createRecipe({ name, ingredients, imageUrl, instruction, cookingTime, userId: user._id })
      .then(res => {
        console.log("added new recipe: ", res);
 
        // Reset the form
        setCookingTime("");
        setImageUrl("");
        setIngredients("");
        setInstruction("");
        setName("");
      
        props.refreshRecipes()
       
      })
      .catch(err => console.log("Error while adding the new movie: ", err));
  };
 

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
 

  return (
    <div className="form-container">
    <button className="recipeHideBtn" onClick={toggleShowForm}>{showForm ? 'Hide Form' : 'Add Recipe'}</button>
    {showForm && (
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <textarea id="ingredients" name="ingredients" className="form-input" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Instruction:</label>
          <textarea id="instruction" name="instruction" className="form-input" value={instruction} onChange={e => setInstruction(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Cooking Time:</label>
          <input type="text" name="cookingTime" value={cookingTime} onChange={e => setCookingTime(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )}
  </div>
  
  );
}