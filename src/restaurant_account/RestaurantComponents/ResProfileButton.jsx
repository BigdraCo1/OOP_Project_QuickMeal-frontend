import './ResHomeButton.css';
import { Link } from "react-router-dom";

function ResProfileButton({id}){
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
  
  export default ResProfileButton;