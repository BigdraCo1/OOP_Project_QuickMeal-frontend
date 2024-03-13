import { Link } from "react-router-dom";

function ResAccHomeButton({id}){
    return (
      <div>
        <Link to = {`/restaurant_account/${id}`}>
          <button className="home-button">
              Home
          </button>
        </Link> 
      </div>
    );
};
  
export default ResAccHomeButton;