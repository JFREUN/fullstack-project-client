import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

export default function EditMeal() {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");
  const[search , setSearch] = useState("");
  const[recipeId, setRecipeId] = useState("");
  const[allRecipes, setAllRecipes] = useState([]);



  const { mealId } = useParams();

  useEffect(() => {
    // <== ADD
    axios
      .get(`${API_URL}/api/meals/${mealId}`)
      .then((response) => {
        const oneMeal = response.data;
        setDay(oneMeal.day);
        setMealType(oneMeal.mealType);
      })
      .catch((error) => console.log(error));
  }, [mealId]);

  useEffect(() => {  
    if (search){
      axios.get(`${API_URL}/api/search?name=${search}`)
    .then(response=>{
      setAllRecipes(response.data)
    })
    }else{  
        axios.get(`${API_URL}/api/meals/${mealId}`)
        .then((response) => {
          const oneMeal = response.data
          setAllRecipes([oneMeal.recipe])
        })
    }
  }, [search])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("In handleSubmit")

    const requestBody = { day, mealType, recipe: recipeId };

    axios
      .put(`${API_URL}/api/meals/${mealId}`, requestBody)
      .then((response) => {
        navigate(`/meals`);
      })
      .catch((error) => console.log(error));
  };



  const deleteMeal = () => {
    //  <== ADD
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/api/meals/${mealId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/meals");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Day:</label>
        <select name="day" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday"> Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <fieldset>
          <legend>Meal Type:</legend>
          <div onChange={(e) => setMealType(e.target.value)}>
            <div>
              {mealType === "Breakfast" ? (
                <input
                  type="radio"
                  id="breakfast"
                  name="mealType"
                  value="Breakfast"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  id="breakfast"
                  name="mealType"
                  value="Breakfast"
                />
              )}

              <label htmlFor="breakfast">Breakfast</label>
            </div>
            <div>
              {mealType === "Lunch" ? (
                <input
                  type="radio"
                  id="lunch"
                  name="mealType"
                  value="Lunch"
                  checked
                />
              ) : (
                <input type="radio" id="lunch" name="mealType" value="Lunch" />
              )}
              <label htmlFor="lunch">Lunch</label>
            </div>
            <div>
              {mealType === "Dinner" ? (
                <input
                  type="radio"
                  id="dinner"
                  name="mealType"
                  value="Dinner"
                  checked
                />
              ) : (
                <input
                  type="radio"
                  id="dinner"
                  name="mealType"
                  value="Dinner"
                />
              )}
              <label htmlFor="dinner">Dinner</label>
            </div>
          </div>
        </fieldset>
        <input type="text" placeholder="Search recipe name" value={search} onChange = {(e) => setSearch (e.target.value)} />
        
        { allRecipes.map(
          (oneRecipe) => {
          return(<div key={oneRecipe._id}>
            <p>{oneRecipe.name}</p>
            <button type="button" onClick={() => setRecipeId(oneRecipe._id)}>Select</button>
          </div>)
        })}

        <button type="submit">Update Meal</button>
      </form>
      <button onClick={deleteMeal}>Delete Meal</button>
    </div>
  );
}
