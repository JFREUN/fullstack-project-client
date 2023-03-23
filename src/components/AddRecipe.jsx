import React from "react";
import { useState } from "react";
import service from "../api/service";




export default function AddRecipe() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState(0);

 

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
      .createRecipe({ name, ingredients, imageUrl, instruction, cookingTime })
      .then(res => {
        // console.log("added new movie: ", res);
 
        // Reset the form
        setCookingTime("");
        setImageUrl("");
        setIngredients("");
        setInstruction("");
        setName("");
      
        // navigate to another page
       
      })
      .catch(err => console.log("Error while adding the new movie: ", err));
  };
 



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <label>Image:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
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
