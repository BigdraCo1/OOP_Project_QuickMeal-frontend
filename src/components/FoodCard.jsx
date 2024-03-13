import './FoodCard.css'

function FoodCard({name, price}){
    return (
      <>
        <button className="restaurant-card">
              <h2>{name}</h2>
              <p>Price: {price}</p>
        </button>
      </>
    );
};
  
  export default FoodCard;