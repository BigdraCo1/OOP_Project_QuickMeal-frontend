import './OrderCard.css'
import { Link } from 'react-router-dom';

function OrderCard({orderID, state, id}){
    return (
      <div>
        {(state === "pending" || state === "get_res" || state === "get_ri" || state === "delivering") &&
        <div className='font-medium text-[1.2rem] bg-slate-300 shadow-lg py-[0.5rem] rounded-md my-[0.5rem] w-full'>
          <Link to = {`/${id}/current_order/detail/${orderID}`}>
          <button className="w-full px-[0.5rem]">
            <h2 className='text-white bg-emerald-600 py-[0.2rem] rounded-md w-full'>Order ID : {orderID}</h2>
            <h2>state : {state}</h2>
          </button>
          </Link>
        </div>
        }
      </div>
    );
};

  export default OrderCard;