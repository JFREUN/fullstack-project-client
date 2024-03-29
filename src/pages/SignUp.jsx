import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/styles.css";
import houseCook from "../images/house-cook.png";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="loginPage">
      <div className="textContainer">
        <h1>Sign Up</h1>
        <p>Welcome Chef, please enter your details.</p>
        <form onSubmit={handleSignupSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="gordonramsey@gmail.com"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="******"
            onChange={handlePassword}
          />

          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleName} placeholder="Gordon Ramsey"/>

          <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have account?</p>
        <Link to={"/login"} className="signupLink"> Login</Link>
      </div>
      <div className="imgContainer">
        <img src={houseCook} alt="" />
      </div>
    </div>
  );
}

export default SignUp;
