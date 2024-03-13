import { Link } from "react-router-dom";

function ResAccountHomeButton({id}){
    return (
      <div>
        <Link to = {`/restaurant_account/${id}`}>
          <button className="home-button">
              Account
          </button>
        </Link> 
      </div>
    );
};

export default ResAccountHomeButton;