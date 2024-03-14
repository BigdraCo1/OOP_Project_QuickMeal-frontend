import './ReviewCard.css'

function ReviewCard({name, comment}){
    return (
      <div className='flex justify-center'>
        <div className="rounded-md shadow-md w-[360px] p-[0.5rem] bg-slate-100">
              <h2 className='text-[1.1rem] font-medium mb-2'>{name}</h2>
              <h3 >{comment}</h3>
        </div>
      </div>
    );
};
  
  export default ReviewCard;