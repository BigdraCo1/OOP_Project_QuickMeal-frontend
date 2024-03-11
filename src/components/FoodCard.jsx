import './FoodCard.css'

function FoodCard({name, price}){
    return (
      <>
        <button className="restaurant-card text-[1.1rem] font-bold shadow-md">
              <h2>{name}</h2>
              <p>Price: {price}</p>
        </button>
      </>
    );
};
  
  export default FoodCard;