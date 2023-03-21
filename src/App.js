import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import SignUp from './pages/SignUp';
import EditRecipe from './pages/EditRecipe';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="/recipes" element={<Recipes/>}/>
      <Route path="/recipes/:recipeId" element={<RecipeDetail/>}/>
      <Route path="/recipes/edit/:recipeId" element={<EditRecipe/>}/>

      </Routes>
    </div>
  );
}

export default App;
