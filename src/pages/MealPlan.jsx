import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddMeal from "../components/AddMealDay";


const API_URL = "http://localhost:5005";

export default function MealPlan() {
  const [meals, setMeals] = useState([]);
  const [show, setShow] = useState(false);

  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  const toggleShow = () => {
    setShow(!show);
  };

const getMeals = () =>{
  const storedToken = localStorage.getItem("authToken");

  axios
  .get(`${API_URL}/api/meals`, { headers: { Authorization: `Bearer ${storedToken}` }})
  .then((response) => {
    console.log(response.data)
    setMeals(response.data);
  })
  .catch((err) => console.log(err));
}
  useEffect(() => {
   getMeals()
  }, []);

  useEffect(() => {
    setMonday(meals.filter((meal) => meal.day === "Monday")[0]);
    setTuesday(meals.filter((meal) => meal.day === "Tuesday")[0]);
    setWednesday(meals.filter((meal) => meal.day === "Wednesday")[0]);
    setThursday(meals.filter((meal) => meal.day === "Thursday")[0]);
    setFriday(meals.filter((meal) => meal.day === "Friday")[0]);
    setSaturday(meals.filter((meal) => meal.day === "Saturday")[0]);
    setSunday(meals.filter((meal) => meal.day === "Sunday")[0]);
  }, [meals])



  return (
    <div>

      {show && <AddMeal getMeals={getMeals} meals={meals}/>}
      <button className="mealButton" onClick={toggleShow}>{show ? "Hide Form" : "Add Meals"}</button>
      <div className="mealplan">
        <div className="dayColumn">
          <p>Monday</p>
          {monday && (
            <div className="mealsContainer">
              <div className="mealDiv">{monday.breakfast.name}</div>
              <div className="mealDiv">{monday.lunch.name}</div>
              <div className="mealDiv">{monday.dinner.name}</div>
              <Link className="mealButton">Edit Monday</Link>
            </div>
          ) }
          {!monday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Tuesday</p>
          {tuesday && (
            <div className="mealsContainer">
              <div className="mealDiv">{tuesday.breakfast.name}</div>
              <div className="mealDiv">{tuesday.lunch.name}</div>
              <div className="mealDiv">{tuesday.dinner.name}</div>
              <button className="mealButton">Edit Tuesday</button>
            </div>
          ) }
          {!tuesday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Wednesday</p>
          {wednesday && (
            <div className="mealsContainer">
              <div className="mealDiv">{wednesday.breakfast.name}</div>
              <div className="mealDiv">{wednesday.lunch.name}</div>
              <div className="mealDiv">{wednesday.dinner.name}</div>
              <button className="mealButton">Edit Wednesday</button>
            </div>
          ) }
          {!wednesday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Thursday</p>
          {thursday && (
            <div>
              <div className="mealDiv">{thursday.breakfast.name}</div>
              <div className="mealDiv">{thursday.lunch.name}</div>
              <div className="mealDiv">{thursday.dinner.name}</div>
              <button className="mealButton">Edit Thursday</button>
            </div>
          ) }
          {!thursday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Friday</p>
          {friday && (
            <div className="mealsContainer">
              <div className="mealDiv">{friday.breakfast.name}</div>
              <div className="mealDiv">{friday.lunch.name}</div>
              <div className="mealDiv">{friday.dinner.name}</div>
              <button className="mealButton">Edit Monday</button>
            </div>
          ) }
          {!friday && <span>Please add a new meal!</span>}
          
        </div>

        <div className="dayColumn">
          <p>Saturday</p>
          {saturday && (
            <div className="mealsContainer">
              <div className="mealDiv">{saturday.breakfast.name}</div>
              <div className="mealDiv">{saturday.lunch.name}</div>
              <div className="mealDiv">{saturday.dinner.name}</div>
              <button className="mealButton">Edit Saturday</button>
            </div>
          ) }
          {!saturday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Sunday</p>
          {sunday && (
            <div className="mealsContainer">
              <div className="mealDiv">{sunday.breakfast.name}</div>
              <div className="mealDiv">{sunday.lunch.name}</div>
              <div className="mealDiv">{sunday.dinner.name}</div>
              <button className="mealButton">Edit Sunday</button>
            </div>
          ) }
          {!sunday && <span>Please add a new meal!</span>}
        </div>
      </div>
    </div>
  );
}
