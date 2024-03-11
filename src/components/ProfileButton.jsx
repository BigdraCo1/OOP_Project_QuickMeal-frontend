import './ProfileButton.css'
import { Link } from "react-router-dom";

function ProfileButton({id}){
    return (
      <>
        <Link to = {`/${id}/Profile`}>
          <button className="profile-button">
            Profile
          </button>
        </Link>
      </>
    );
};
  
  export default ProfileButton;