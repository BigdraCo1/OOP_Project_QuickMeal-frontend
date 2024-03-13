import './RestaurantTab.css'

function RestaurantTab({name, rating, location}){
    return (
      <>
        <button className="restaurant-tab shadow-xl">
              <h2>{name}</h2>
              <p>Rating : {rating}</p>
              <p>Location : {location}</p>
        </button>
      </>
    );
};
  
  export default RestaurantTab;