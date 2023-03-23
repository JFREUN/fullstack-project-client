import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

export default function AddMeal() {
    const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { day, mealType };
    
    axios
      .post(`${API_URL}/api/meals`, requestBody)
      .then((response) => {
        console.log(response)
        setDay("");
        setMealType("");
        navigate("/meals");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Day:</label>
        <select name="day" >
          <option value={day} onClick={(e) => setDay(e.target.value)}>Monday</option>
          <option value={day} onClick={(e) => setDay(e.target.value)}>Tuesday</option>
          <option value={day} onClick={(e) => setDay(e.target.value)}>Wednesday</option>
          <option value={day} onClick={(e) => setDay(e.target.value)}>Thursday</option>
          <option value={day} onClick={(e) => setDay(e.target.value)}>Friday</option>
          <option value={day} onClick={(e) => setDay(e.target.value)}>Saturday</option>
          <option value={day} onClick={(e) => setDay(e.target.value)}>Sunday</option>
        </select>

        <fieldset>
          <legend>Meal Type:</legend>
          <div>
            <input
              type="radio"
              id="breakfast"
              name="mealType"
              value={mealType}
              checked
              onClick={(e) => setMealType(e.target.value)}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div>
            <input
              type="radio"
              id="lunch"
              name="mealType"
              value={mealType}
              onClick={(e) => setMealType(e.target.value)}
            />
            <label htmlFor="lunch">Lunch</label>
          </div>
          <div>
            <input
              type="radio"
              id="dinner"
              name="mealType"
              value={mealType}
              onClick={(e) => setMealType(e.target.value)}
            />
            <label htmlFor="dinner">Dinner</label>
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
