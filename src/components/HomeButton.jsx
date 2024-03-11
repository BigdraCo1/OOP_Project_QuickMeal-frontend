import './HomeButton.css'
import { Link } from "react-router-dom";
import { global_customer_id } from '/src/global.jsx'

function HomeButton(){
    const id = global_customer_id
    return (
      <>
        <Link to = {`/restaurants`}>
          <button className="home-button">
              Home
          </button>
        </Link>
      </>
    );
};
  
  export default HomeButton;