import './RestaurantCard.css'

function RestaurantCard({name, rating, location}){
    return (
      <>
        <button className="restaurant-card shadow-xl">
              <h2 className='text-[1.1rem] font-bold rounded-md border-2 border-slate-300 hover:text-slate-600'>{name}</h2>
              <p className='text-[1.1rem] font-medium'>Rating: {rating}</p>
              <p className='text-[1.1rem] font-medium'>Location: {location}</p>
        </button>
      </>
    );
};
  
  export default RestaurantCard;