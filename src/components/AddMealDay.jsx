import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

export default function AddMeal() {
    const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");
  const[recipeId, setRecipeId] = useState([]);
  const[allRecipes, setAllRecipes] = useState([]);
  const[search , setSearch] = useState("")
  
 




  
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { day, mealType, recipe: recipeId };
    
    axios
      .post(`${API_URL}/api/meals`, requestBody)
      .then((response) => {
        setDay("");
        setMealType("");
        navigate("/meals");
      })
      .catch((error) => console.log(error));
  };
useEffect(() => {
  

  
  if (search){

    axios.get(`${API_URL}/api/search?name=${search}`)
  .then(response=>{
    setAllRecipes(response.data)
  })
  }else{

    
      axios.get(`${API_URL}/api/recipes`)
      .then((response) => {
        setAllRecipes(response.data)
      })
    
  
  }

}, [search])


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Day:</label>
        <select name="day" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="Monday" >Monday</option>
          <option value="Tuesday" >Tuesday</option>
          <option value="Wednesday" >Wednesday</option>
          <option value="Thursday" >Thursday</option>
          <option value="Friday"> Friday</option>
          <option value="Saturday" >Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <fieldset>
          <legend>Meal Type:</legend>
          <div onChange={(e) => setMealType(e.target.value)}>
          <div>
            <input
              type="radio"
              id="breakfast"
              name="mealType"
              value="Breakfast"
              // onChange={(e) => console.log(e.target.value)}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div>
            <input
              type="radio"
              id="lunch"
              name="mealType"
              value="Lunch"
              // onChange={(e) => console.log(e.target)}
            />
            <label htmlFor="lunch">Lunch</label>
          </div>
          <div>
            <input
              type="radio"
              id="dinner"
              name="mealType"
              value="Dinner"
              // onChange={(e) => console.log(e.target)}
            />
            <label htmlFor="dinner">Dinner</label>
          </div>
          </div>
        </fieldset>
        <input type="text" placeholder="Search recipe name" value={search} onChange = {(e) => setSearch (e.target.value)} />
        {allRecipes.map(
          (oneRecipe) => (
          <div key={oneRecipe._id}>
            <p>{oneRecipe.name}</p>
            <button onClick={() => setRecipeId(oneRecipe._id)}>Select</button>
          </div>
        ))}

        {allRecipes.map(
          (oneRecipe) => (
          <div key={oneRecipe._id}>
            <p>{oneRecipe.name}</p>
            <button onClick={() => setRecipeId(oneRecipe._id)}>Select</button>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}