import Footer from "../components/Footer";
import '../css/styles.css'
import Name from '../images/homePageImg.jpg';

function HomePage() {
    return (
        
      <div>
       <div>
        <h1>Bienvenue Dyner!</h1>
        <img src={Name} alt="" />
        </div>
        {/* <button>Sign Up</button>
        <button>Login</button> */}
        <Footer/>
      </div>
    );
  }
  
  export default HomePage;