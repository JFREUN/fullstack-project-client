import "../css/styles.css";
import happyIngredients from "../images/happy-ingredients.png";
import Footer from "../components/Footer";
import ramen from "../images/Ramen.svg";
import wine from "../images/Wine.svg";
import cutlery from "../images/Cutlery.svg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="publicHome">
      <section className="heroSection">
        <div className="heroText">
          <h1>Bienvenue a Dyner!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            molestie massa tellus, eget blandit arcu porttitor nec. Vivamus
            eleifend est volutpat mauris bibendum, nec.
          </p>
          <div className="buttonWrapper">
            <Link to="/login">
              {" "}
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button className="buttonSignup">Sign up</button>
            </Link>
          </div>
        </div>
        <div className="heroImage">
          <img src={happyIngredients} alt="" />
        </div>
      </section>

      <section className="trioSection">
        <div className="trioWrapper">
          <div>
            <div className="imageWrapper">
              <img src={ramen} alt="" />
            </div>
            <h3>Lorem ipsum dolor</h3>
            <p>
              sit amet consectetur adipisicing elit. Corporis repudiandae
              doloremque
            </p>
          </div>
          <div>
            <div className="imageWrapper">
              <img src={cutlery} alt="" />
            </div>
            <h3>Lorem ipsum dolor</h3>
            <p>
              sit amet consectetur adipisicing elit. Corporis repudiandae
              doloremque
            </p>
          </div>
          <div>
            <div className="imageWrapper">
              <img src={wine} alt="" />
            </div>
            <h3>Lorem ipsum dolor</h3>
            <p>
              sit amet consectetur adipisicing elit. Corporis repudiandae
              doloremque
            </p>
          </div>
        </div>
      </section>
      <section></section>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
