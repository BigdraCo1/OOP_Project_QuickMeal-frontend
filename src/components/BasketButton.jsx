import './BasketButton.css'
import { Link } from "react-router-dom";

function BasketButton({id}){
    return (
      <div>
        <Link to = {`/${id}/basket`}>
          <button className="basket-button">
              Basket
          </button>
        </Link>
      </div>
    );
};
  
  export default BasketButton;