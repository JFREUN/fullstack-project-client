import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import "../css/styles.css";
import logo from "../images/newLogo.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
    <Link to="/" className="logoLink">
    <img src={logo} alt="logo" className="newLogo" />
    </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/meals" className="nav-link">
                Meal Plan
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/recipes" className="nav-link">
                Recipes
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ingredients" className="nav-link">
                Fridge
              </Link>
            </li>

            <li className="nav-item">
              <Link onClick={logOutUser} className="nav-link logout-link">
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
