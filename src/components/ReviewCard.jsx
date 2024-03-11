import './ReviewCard.css'

function ReviewCard({name, comment}){
    return (
      <>
        <div className="review-card">
              <h2>{name}</h2>
              <h3>{comment}</h3>
        </div>
      </>
    );
};
  
  export default ReviewCard;