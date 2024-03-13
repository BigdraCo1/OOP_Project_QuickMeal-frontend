import './ProfileButton.css'
import { Link } from "react-router-dom";

function ProfileButton({id}){
    return (
      <div>
        <Link to = {`/${id}/Profile`}>
          <button className="profile-button">
            Profile
          </button>
        </Link>
      </div>
    );
};
  
  export default ProfileButton;