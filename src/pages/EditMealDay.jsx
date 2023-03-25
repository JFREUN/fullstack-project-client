import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

export default function EditMeal() {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { day, mealType };

    axios
      .put(`${API_URL}/api/meals/${mealId}`, requestBody)
      .then((response) => {
        setDay("");
        setMealType("");
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

        <button type="submit">Update Meal</button>
      </form>
      <button onClick={deleteMeal}>Delete Meal</button>
    </div>
  );
}
