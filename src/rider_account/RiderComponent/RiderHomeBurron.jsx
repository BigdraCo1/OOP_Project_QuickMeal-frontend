import { Link } from "react-router-dom";

function RiderHomeButton({id}){
    return (
      <div>
        <Link to = {`/rider_account/${id}`}>
          <button className="home-button">
              Home
          </button>
        </Link> 
      </div>
    );
};

export default RiderHomeButton;