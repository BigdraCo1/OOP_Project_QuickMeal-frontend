import './RestaurantTab.css'

function RestaurantTab({name, rating, location}){
    return (
      <>
        <button className="restaurant-tab  shadow-xl">
              <h2 className='border-2 border-slate-400 rounded-md'>{name}</h2>
              <div className='border-2 border-slate-400 rounded-md mt-[0.5rem]'>
                <p className='text-[1.1rem] font-medium'>Rating : {rating}</p>
                <p className='text-[1.1rem] font-medium'>Location : {location}</p>
              </div>
        </button>
      </>
    );
};
  
  export default RestaurantTab;