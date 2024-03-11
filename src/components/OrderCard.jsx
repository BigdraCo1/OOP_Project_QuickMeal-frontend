import './OrderCard.css'

function OrderCard({orderID, state}){
    return (
      <>
        <div className='midText'>
        <button className="order-card">
          <h2>Order ID : {orderID}</h2>
          <h2>state : {state}</h2>
        </button>
        </div>
      </>
    );
};

  export default OrderCard;