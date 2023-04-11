import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AddMeal from "../components/AddMealDay";
import binIcon from "../images/icons8-waste-50.png";
import editIcon from "../images/icons8-edit-row-50.png";
import "../css/styles.css";
import { AuthContext } from "./../context/auth.context";
import breakfastIcon from "../images/Breakfast.png";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
  
  const storedToken = localStorage.getItem("authToken");

  const { user } = useContext(AuthContext);

  const toggleShow = () => {
    setShow(!show);
  };

  const getMeals = () => {
    axios
      .get(`${API_URL}/api/meals`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setMeals(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMeals();
  }, []);

  useEffect(() => {
    if(meals){
    setMonday(meals.filter((meal) => meal.day === "Monday")[0]);
    setTuesday(meals.filter((meal) => meal.day === "Tuesday")[0]);
    setWednesday(meals.filter((meal) => meal.day === "Wednesday")[0]);
    setThursday(meals.filter((meal) => meal.day === "Thursday")[0]);
    setFriday(meals.filter((meal) => meal.day === "Friday")[0]);
    setSaturday(meals.filter((meal) => meal.day === "Saturday")[0]);
    setSunday(meals.filter((meal) => meal.day === "Sunday")[0]);
    }
    
  }, [meals]);

  const handleDelete = (dayId) => {
    axios
      .delete(`${API_URL}/api/meals/${dayId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        console.log("Item was deleted!");
      })
      .catch((err) => console.log("This is a delete error: ", err));
  };

  return (
    <div>
      <div className="mealplanHeading">
        <div className="welcomeWrapper">
          {" "}
          <img src={breakfastIcon} alt="" />
          <h1>
            Welcome <span>{user.name}</span>!
          </h1>
        </div>
        <p>Create your new mealplan and have a nice week!</p>
        <div className="addAndDelete">
          <button className="mealButton" onClick={toggleShow}>
            {show ? "Hide Form" : "Add Meals"}
          </button>
        </div>
      </div>
      {show && <AddMeal getMeals={getMeals} meals={meals} />}

      <div className="mealplan">
        <div className="dayColumn">
          <p>Monday</p>
          {monday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${monday.breakfast._id}`}>
                  {monday.breakfast.name}
                </a>
                <img src={monday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${monday.lunch._id}`}>{monday.lunch.name}</a>
                <img src={monday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${monday.dinner._id}`}>
                  {monday.dinner.name}
                </a>
                <img src={monday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link to={`/meals/edit/${monday._id}`} className="editButton">
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(monday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!monday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>

        <div className="dayColumn">
          <p>Tuesday</p>
          {tuesday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${tuesday.breakfast._id}`}>
                  {tuesday.breakfast.name}
                </a>
                <img src={tuesday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${tuesday.lunch._id}`}>
                  {tuesday.lunch.name}
                </a>
                <img src={tuesday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${tuesday.dinner._id}`}>
                  {tuesday.dinner.name}
                </a>
                <img src={tuesday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link to={`/meals/edit/${tuesday._id}`} className="editButton">
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(tuesday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!tuesday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>

        <div className="dayColumn">
          <p>Wednesday</p>
          {wednesday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${wednesday.breakfast._id}`}>
                  {wednesday.breakfast.name}
                </a>
                <img src={wednesday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${wednesday.lunch._id}`}>
                  {wednesday.lunch.name}
                </a>
                <img src={wednesday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${wednesday.dinner._id}`}>
                  {wednesday.dinner.name}
                </a>
                <img src={wednesday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link
                  to={`/meals/edit/${wednesday._id}`}
                  className="editButton"
                >
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(wednesday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!wednesday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>

        <div className="dayColumn">
          <p>Thursday</p>
          {thursday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${thursday.breakfast._id}`}>
                  {thursday.breakfast.name}
                </a>
                <img src={thursday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${thursday.lunch._id}`}>
                  {thursday.lunch.name}
                </a>
                <img src={thursday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${thursday.dinner._id}`}>
                  {thursday.dinner.name}
                </a>
                <img src={thursday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link to={`/meals/edit/${thursday._id}`} className="editButton">
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(thursday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!thursday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>

        <div className="dayColumn">
          <p>Friday</p>
          {friday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${friday.breakfast._id}`}>
                  {friday.breakfast.name}
                </a>
                <img src={friday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${friday.lunch._id}`}>{friday.lunch.name}</a>
                <img src={friday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${friday.dinner._id}`}>
                  {friday.dinner.name}
                </a>
                <img src={friday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link to={`/meals/edit/${friday._id}`} className="editButton">
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(friday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!friday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>

        <div className="dayColumn">
          <p>Saturday</p>
          {saturday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${saturday.breakfast._id}`}>
                  {saturday.breakfast.name}
                </a>
                <img src={saturday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${saturday.lunch._id}`}>
                  {saturday.lunch.name}
                </a>
                <img src={saturday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${saturday.dinner._id}`}>
                  {saturday.dinner.name}
                </a>
                <img src={saturday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link to={`/meals/edit/${saturday._id}`} className="editButton">
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(saturday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!saturday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>

        <div className="dayColumn">
          <p>Sunday</p>
          {sunday && (
            <div className="mealsContainer">
              <div className="mealDiv">
                <a href={`/recipes/${sunday.breakfast._id}`}>
                  {sunday.breakfast.name}
                </a>
                <img src={sunday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${sunday.lunch._id}`}>{sunday.lunch.name}</a>
                <img src={sunday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
                <a href={`/recipes/${sunday.dinner._id}`}>
                  {sunday.dinner.name}
                </a>
                <img src={sunday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
                <Link to={`/meals/edit/${sunday._id}`} className="editButton">
                  <img src={editIcon} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(sunday._id)}
                  className="editButton"
                >
                  <img src={binIcon} alt="" />
                </button>
              </div>
            </div>
          )}
          {!sunday && (
            <div className="noMealMessage">
              {" "}
              <span>Please add a new meal!</span>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
