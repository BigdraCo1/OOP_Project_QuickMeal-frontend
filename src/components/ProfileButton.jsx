import './ProfileButton.css'
import { Link } from "react-router-dom";
import { global_customer_id } from '/src/global.jsx'

const id = global_customer_id

function ProfileButton(){
    return (
      <>
        <Link to = {`/Profile/${id}`}>
          <button className="profile-button">
            Profile
          </button>
        </Link>
      </>
    );
};
  
  export default ProfileButton;