import { Link } from "react-router-dom";

function ResHomeButton({name}){
    return (
      <div>
        <Link to = {`/${name}`}>
          <button className="home-button">
                Restaurant
          </button>
        </Link>
      </div>
    );
};

export default ResHomeButton;