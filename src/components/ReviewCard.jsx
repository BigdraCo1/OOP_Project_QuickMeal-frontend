import './ReviewCard.css'

function ReviewCard({name, comment}){
    return (
      <>
        <div className="shadow-md w-[360px]">
              <h2 className='text-[1.1rem] font-medium mb-2'>{name}</h2>
              <h3 >{comment}</h3>
        </div>
      </>
    );
};
  
  export default ReviewCard;