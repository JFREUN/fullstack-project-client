import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../api/service";
import "../css/styles.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function EditRecipe() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [allIngredients, setAllIngredients] = useState([]);
  const [search, setSearch] = useState([]);

  const navigate = useNavigate();

  const { recipeId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const ingredientsCopy = [...ingredients];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        const oneRecipe = response.data;
        setName(oneRecipe.name);
        setIngredients(oneRecipe.ingredients);
        setImageUrl(oneRecipe.imageUrl);
        setInstruction(oneRecipe.instruction);
        setCookingTime(oneRecipe.cookingTime);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    if (search) {
      axios
        .get(`${API_URL}/api/ingredients/search?name=${search}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllIngredients(response.data);
        })
        .catch((err) => console.log("This is a search error:", err));
    }
  }, [search]);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      imageUrl,
      instruction,
      ingredients,
      cookingTime,
    };

    axios
      .put(`${API_URL}/api/recipes/${recipeId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/recipes/${recipeId}`);
      });
  };

  const deleteRecipe = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URL}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };

  const addIngredients = (ingredientId) => {
    console.log(ingredientsCopy);
    ingredientsCopy.splice(0, 0, ingredientId);
    setIngredients(ingredientsCopy);
  };

  return (
    <div className="form-container-edit">
    <div className="edit-details">
      <img className="edit-recipe-img" src={imageUrl} alt="recipe" />
      <p>Instructions:{instruction}</p>
      <p>Ingredients:</p>
      {ingredients && ingredients.map((ingredient) => {
        return(
          <li key={ingredient._id}>{ingredient.name}</li>
        )
      })}
      <p>Cooking Time: {cookingTime}</p>
</div>
      <div className="form-group-edit">
        <form onSubmit={handleFormSubmit}>

          <div className="form-group-edit">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group-edit">
            <label>Image:</label>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
          </div>
          <div className="form-group-edit">
            <label>Instruction:</label>
            <input
              type="text"
              name="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </div>
          <div className="form-group-edit">
            <label htmlFor="selectIngredients"> Ingredients:</label>
            <input
              className="addIngredients"
              id="selectIngredients"
              type="text"
              placeholder="Search Ingredients"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="ingredient-list">
              { allIngredients.map((ingredient) => {
                return (
                  <div key={ingredient._id} className="searchDiv">
                    <div className="searchP">{ingredient.name}</div>
                    <button
                      className="searchButton"
                      type="button"
                      onClick={() => addIngredients(ingredient._id)}
                    >
                      Select
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-group-edit">
            <label>Cooking Time:</label>
            <input
              type="text"
              name="cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
          </div>
          <button type="submit">Update Recipe</button>
          <button className="recipebtn" onClick={deleteRecipe}>
            Delete Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
