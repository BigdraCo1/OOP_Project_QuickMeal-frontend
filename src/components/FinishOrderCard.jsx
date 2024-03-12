import './FinishOrderCard.css'
import { Link } from 'react-router-dom';

function FinishOrderCard({orderID, state, id}){
    return (
      <>
        {(state !== "pending" && state !== "get_res" && state !== "get_ri" && state !== "delivering") &&
        <div className='midText'>
          <Link to = {`/${id}/order_History/detail/${orderID}`}>
          <button className="mx-[1rem] my-[0.6rem] py-[0.8rem] border-none shadow-xl
           border-black rounded-lg p-10 min-w-200 h-auto bg-slate-400 hover:">
            <h2 className='text-emerald-700 font-bold text-[1.1rem]'>Order ID : {orderID}</h2>
            <h2 className='text-emerald-700 font-bold text-[1.1rem]'>state : {state}</h2>
          </button>
          </Link>
        </div>
        }
      </>
    );
};

  export default FinishOrderCard;