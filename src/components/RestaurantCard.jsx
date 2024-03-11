import './RestaurantCard.css'

function RestaurantCard({name, rating, location}){
    return (
      <>
        <button className="restaurant-card">
              <h2>{name}</h2>
              <p>Rating: {rating}</p>
              <p>Location: {location}</p>
        </button>
      </>
    );
};
  
  export default RestaurantCard;