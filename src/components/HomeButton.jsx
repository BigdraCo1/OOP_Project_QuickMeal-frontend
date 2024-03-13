import './HomeButton.css'
import { Link } from "react-router-dom";

function HomeButton({id}){
    return (
      <div>
        <Link to = {`/${id}/restaurants`}>
          <button className="home-button">
              Home
          </button>
        </Link>
      </div>
    );
};
  
  export default HomeButton;