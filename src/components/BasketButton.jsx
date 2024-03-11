import './BasketButton.css'
import { Link } from "react-router-dom";

function BasketButton({id}){
    return (
      <>
        <Link to = {`/${id}/basket`}>
          <button className="basket-button">
              Basket
          </button>
        </Link>
      </>
    );
};
  
  export default BasketButton;