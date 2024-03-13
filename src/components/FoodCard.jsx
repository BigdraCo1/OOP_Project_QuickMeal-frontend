import './FoodCard.css'

function FoodCard({name, price}){
    return (
      <div className='flex justify-center'>
        <button className="w-[350px] text-[1.1rem] font-medium bg-white mt-[1rem] px-[0.5rem] py-[0.5rem] rounded-md shadow-md">
              <h2 className='border-2 border-slate-300 rounded-md'>{name}</h2>
              <p>Price: {price}</p>
        </button>
      </div>
    );
};
  
  export default FoodCard;