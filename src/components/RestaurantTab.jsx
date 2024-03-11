import './RestaurantTab.css'

function RestaurantTab({name, rating, location}){
    return (
      <>
        <button className="restaurant-tab">
              <h2 className='font-medium'>{name}</h2>
              <p className='text-[1.2rem] font-medium'>Rating : {rating}</p>
              <p className='text-[1.2rem] font-medium'>Location : {location}</p>
        </button>
      </>
    );
};
  
  export default RestaurantTab;