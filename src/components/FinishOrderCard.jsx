import './FinishOrderCard.css'

function FinishOrderCard({orderID, state}){
    return (
      <>
        {(state !== "pending" && state !== "get_res" && state !== "get_ri" && state !== "delivering") &&
        <div className='midText'>
          <button className="order-card">
            <h2>Order ID : {orderID}</h2>
            <h2>state : {state}</h2>
          </button>
        </div>
        }
      </>
    );
};

  export default FinishOrderCard;