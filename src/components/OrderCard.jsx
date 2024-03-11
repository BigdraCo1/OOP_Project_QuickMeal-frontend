import './OrderCard.css'
import { Link } from 'react-router-dom';

function OrderCard({orderID, state, id}){
    return (
      <>
        {(state === "pending" || state === "get_res" || state === "get_ri" || state === "delivering") &&
        <div className='midText'>
          <Link to = {`/${id}/current_order/detail/${orderID}`}>
          <button className="order-card">
            <h2>Order ID : {orderID}</h2>
            <h2>state : {state}</h2>
          </button>
          </Link>
        </div>
        }
      </>
    );
};

  export default OrderCard;