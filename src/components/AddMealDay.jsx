import axios from "axios";
import React from "react";
import { useEffect,useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
const API_URL = "http://localhost:5005";

export default function AddMeal() {
  const navigate = useNavigate();
  const [day, setDay] = useState("");

  const [breakfast, setBreakfast] = useState('')
  const [lunch, setLunch] = useState('')
  const [dinner, setDinner] = useState('')

  const[allBreakfasts, setAllBreakfasts] = useState([]);
  const[allLunches, setAllLunches] = useState([]);
  const[allDinners, setAllDinners] = useState([]);
  
  const[breakfastSearch , setBreakfastSearch] = useState("")
  const[lunchSearch , setLunchSearch] = useState("")
  const[dinnerSearch , setDinnerSearch] = useState("")


  const {user} = useContext(AuthContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { day, breakfast, lunch, dinner, userId: user};
    
    axios
      .post(`${API_URL}/api/meals`, requestBody)
      .then((response) => {
        console.log(day)
        console.log(response)
        setBreakfast("");
        setLunch("");
        setDinner("");
        navigate("/meals");
      })
      .catch((error) => console.log(error));
  };

useEffect(() => {  
  if (breakfastSearch){
    axios.get(`${API_URL}/api/search?name=${breakfastSearch}`)
  .then(response=>{
    setAllBreakfasts(response.data)
  })
  }
}, [breakfastSearch])

useEffect(() => {  
  if (lunchSearch){
    axios.get(`${API_URL}/api/search?name=${lunchSearch}`)
  .then(response=>{
    setAllLunches(response.data)
  })
  }
}, [lunchSearch])

useEffect(() => {  
  if (dinnerSearch){
    axios.get(`${API_URL}/api/search?name=${dinnerSearch}`)
  .then(response=>{
    setAllDinners(response.data)
  })
  }
}, [dinnerSearch])


  return (
    <div>
    <h2>Add a meal:</h2>
      <form className ="addMealDay" onSubmit={handleSubmit}>
        <label className="addMealLabels" htmlFor="selectDay">Day:</label>
        <select id="selectDay" name="day" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday"> Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        
        <div className="mealSearch">
        <label className="addMealLabels" htmlFor="selectBreakfast"> Breakfast:</label>
        <input className="addMealInputs" id="selectBreakfast" type="text" placeholder="Search Breakfast" value={breakfastSearch} onChange = {(e) => setBreakfastSearch (e.target.value)} />
        {allBreakfasts.map(
          (oneRecipe) => {
            return(
          <div key={oneRecipe._id} className="searchDiv">
            <p className="searchP">{oneRecipe.name}</p>
            <button className="searchButton" type ="button" onClick={() => setBreakfast(oneRecipe._id)}>Select</button>
          </div>)
        })}

        <label className="addMealLabels" htmlFor="selectLunch"> Lunch:</label>
        <input className="addMealInputs" id="selectLunch" type="text" placeholder="Search Lunch" value={lunchSearch} onChange = {(e) => setLunchSearch (e.target.value)} />
        {allLunches.map(
          (oneRecipe) => {
            return(
          <div key={oneRecipe._id} className="searchDiv">
            <p className="searchP">{oneRecipe.name}</p>
            <button className="searchButton" type ="button" onClick={() => setLunch(oneRecipe._id)}>Select</button>
          </div>)
        })}
        <label className="addMealLabels" htmlFor="selectDinner"> Dinner:</label>
        <input className="addMealInputs" id="selectDinner" type="text" placeholder="Search Dinner" value={dinnerSearch} onChange = {(e) => setDinnerSearch (e.target.value)} /> 
        {allDinners.map(
          (oneRecipe) => {
            return(
          <div key={oneRecipe._id} className="searchDiv">
            <p className="searchP">{oneRecipe.name}</p>
            <button className="searchButton" type ="button" onClick={() => setDinner(oneRecipe._id)}>Select</button>
          </div>)
        })}
        
        </div>

        <button className="submitButton" type="submit">Submit</button>
      </form>
      
    </div>
  );
}