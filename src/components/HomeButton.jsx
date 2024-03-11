import './HomeButton.css'
import { Link } from "react-router-dom";

function HomeButton({id}){
    return (
      <>
        <Link to = {`/${id}/restaurants`}>
          <button className="home-button">
              Home
          </button>
        </Link>
      </>
    );
};
  
  export default HomeButton;