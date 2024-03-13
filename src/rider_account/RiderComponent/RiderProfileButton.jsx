import './RiderProfileButton.css'
import { Link } from "react-router-dom";

function RiderProfileButton({id}){
    return (
      <div>
        <Link to = {`/rider_account/${id}/profile`}>
          <button className="profile-button">
            Profile
          </button>
        </Link>
      </div>
    );
};
  
  export default RiderProfileButton;