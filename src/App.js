import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import SignUp from './pages/SignUp';
import EditRecipe from './pages/EditRecipe';
import MealPlan from './pages/MealPlan';
import EditMeal from './pages/EditMealDay';
import Login from './pages/Login';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/recipes" element={<Recipes/>}/>
      <Route path="/recipes/:recipeId" element={<RecipeDetail/>}/>
      <Route path="/recipes/edit/:recipeId" element={<EditRecipe/>}/>
      <Route path='/meals' element ={<MealPlan/>}/>
      <Route path='meals/edit/:mealId' element={<EditMeal/>}/>

      </Routes>
    </div>
  );
}

export default App;
