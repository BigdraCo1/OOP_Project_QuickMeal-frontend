import './ResAccHomeButton.css';
import { Link } from "react-router-dom";

function ResAccProfileButton({id}){
    return (
      <div>
        <Link to = {`/restaurant_account/${id}/profile`}>
          <button className="profile-button">
            Profile
          </button>
        </Link>
      </div>
    );
};
  
  export default ResAccProfileButton;