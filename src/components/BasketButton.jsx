import './BasketButton.css'
import { Link } from "react-router-dom";
import { global_customer_id } from '/src/global.jsx'

function BasketButton(){
    const id = global_customer_id
    return (
      <>
        <Link to = {`/basket/${id}`}>
          <button className="basket-button">
              Basket
          </button>
        </Link>
      </>
    );
};
  
  export default BasketButton;