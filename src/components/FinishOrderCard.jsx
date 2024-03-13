import './FinishOrderCard.css'
import { Link } from 'react-router-dom';

function FinishOrderCard({orderID, state, id}){
    return (
      <>
        {(state !== "pending" && state !== "get_res" && state !== "get_ri" && state !== "delivering") &&
        <div className='midText'>
          <Link to = {`/${id}/order_History/detail/${orderID}`}>
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

  export default FinishOrderCard;