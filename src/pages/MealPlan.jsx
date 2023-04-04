import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import AddMeal from "../components/AddMealDay";
import binIcon from "../images/icons8-waste-50.png";
import editIcon from "../images/icons8-edit-row-96.png"


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

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
  const navigate = useNavigate();

  const toggleShow = () => {
    setShow(!show);
  };

const getMeals = () =>{

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

  const handleDelete = ((dayId) => {
    axios
    .delete(`${API_URL}/api/meals/${dayId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
    .then(() => {
      console.log("Item was deleted!")
    })
    .catch((err) => console.log("This is a delete error: ", err))
  })


  return (
    <div>

      {show && <AddMeal getMeals={getMeals} meals={meals}/>}
      <button className="mealButton" onClick={toggleShow}>{show ? "Hide Form" : "Add Meals"}</button>
      <div className="mealplan">
        <div className="dayColumn">
          <p>Monday</p>
          {monday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{monday.breakfast.name}</a>
              <img src={monday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{monday.lunch.name}</a>
              <img src={monday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{monday.dinner.name}</a>
              <img src={monday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${monday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={() => handleDelete(monday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!monday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Tuesday</p>
          {tuesday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{tuesday.breakfast.name}</a>
              <img src={tuesday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{tuesday.lunch.name}</a>
              <img src={tuesday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{tuesday.dinner.name}</a>
              <img src={tuesday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${tuesday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={() => handleDelete(tuesday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!tuesday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Wednesday</p>
          {wednesday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{wednesday.breakfast.name}</a>
              <img src={wednesday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{wednesday.lunch.name}</a>
              <img src={wednesday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{wednesday.dinner.name}</a>
              <img src={wednesday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${wednesday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={()=> handleDelete(wednesday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!wednesday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Thursday</p>
          {thursday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{thursday.breakfast.name}</a>
              <img src={thursday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{thursday.lunch.name}</a>
              <img src={thursday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{thursday.dinner.name}</a>
              <img src={thursday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${thursday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={() => handleDelete(thursday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!thursday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Friday</p>
          {friday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{friday.breakfast.name}</a>
              <img src={friday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{friday.lunch.name}</a>
              <img src={friday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{friday.dinner.name}</a>
              <img src={friday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${friday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={() => handleDelete(friday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!friday && <span>Please add a new meal!</span>}
          
        </div>

        <div className="dayColumn">
          <p>Saturday</p>
          {saturday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{saturday.breakfast.name}</a>
              <img src={saturday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{saturday.lunch.name}</a>
              <img src={saturday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{saturday.dinner.name}</a>
              <img src={saturday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${saturday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={() => handleDelete(saturday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!saturday && <span>Please add a new meal!</span>}
        </div>

        <div className="dayColumn">
          <p>Sunday</p>
          {sunday && (
            <div className="mealsContainer">
              <div className="mealDiv">
               <a href="#">{sunday.breakfast.name}</a>
              <img src={sunday.breakfast.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{sunday.lunch.name}</a>
              <img src={sunday.lunch.imageUrl} alt="" />
              </div>
              <div className="mealDiv">
              <a href="#">{sunday.dinner.name}</a>
              <img src={sunday.dinner.imageUrl} alt="" />
              </div>
              <div className="buttonsContainer">
              <Link to={`/meals/edit/${sunday._id}`}className="editButton"><img src={editIcon} alt="" /></Link>
              <button type="button" onClick={() => handleDelete(sunday._id)} className="editButton"><img src={binIcon} alt="" /></button>
              </div>  
            </div>
          ) }
          {!sunday && <span>Please add a new meal!</span>}
        </div>
      </div>
    </div>
  );
}
