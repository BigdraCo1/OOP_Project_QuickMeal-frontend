import React, { useState, useEffect } from 'react';
import './review.css'
import { useParams } from 'react-router-dom'
import RestaurantTab from '../components/RestaurantTab';
import ReviewCard from '../components/ReviewCard';
import HomeButton from '../components/HomeButton';
import api from '../Header/API'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerReviews(){
  const { id, resId } = useParams()

  const [reviews, setReviews] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowResDetail() {
    try {
      const response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_id/${resId}`)
      setRestaurant(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowResDetail()}, []);

  async function ShowReviews() {
    try {
      const response = await api.get(`${BASE_URL}/review/show/${resId}`)
      setReviews(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  
  useEffect(() => {ShowReviews()}, []);

  function renderStars(rating, comment){
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className='star'>&#9733;</span>);
      } else {
        stars.push(<span key={i} className='star'>&#9734;</span>);
      }
    }
    stars.push(<div>{comment}</div>);
    return stars;
  };

  async function postReview() {
    const comment = document.getElementById("comment").value;
    const rating = parseInt(document.getElementById("rating").value);
  
    if (!comment || !rating) {
      alert("Please enter both comment and rating!");
      return;
    }

    const reviewData = {
      customer_id: id,
      rating: rating,
      comment: comment,
      restaurant_id: resId
    };
  
    try {
      const response = await api.post(`${BASE_URL}/review/add`, reviewData)
      alert(response.data)
      window.location.reload();
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <div className='flex justify-center bg-gradient-to-b from-green-500 to-lime-500 min-h-screen'>
    { isLoading && <div>.....Loading.....</div> }
    { !isLoading && 
    <div className='p-[1rem] bg-slate-300 shadow-xl rounded-md'>
      <HomeButton id={id}/>
      <div className='container'>
          <RestaurantTab name = {restaurant.Restaurant_Name} rating = {restaurant.Rate} 
            location = {restaurant.Restaurant_Location} />
      </div>
      <div className='container pl-[2rem]'>
        <h1> {renderStars(Math.floor(restaurant.Rate), "")} </h1>
      </div>
      <div className='container'>
        {Object.entries(reviews).map(([key, [rate, comment]]) => (
            <div key = {key} style={{marginBottom:"20px"}}>
                <ReviewCard name = {key} comment = {renderStars(Math.floor(rate), comment)}/>
            </div>
        ))}
      </div>
      <div className="container">
        <label for="rating" >Rating:</label><br/>
        <input
        className='border-2 border-slate-300 px-[1.1rem] py-[0.5rem] my-[0.5rem] rounded-md bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-in-out'
        type="number" id="rating" name="rating" min="1" max="5"/><br/>
        <textarea className='border-2 border-slate-300 px-[1.1rem] py-[0.5rem] my-[0.5rem] rounded-md bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-in-out'
        id="comment" name="comment" rows="1" cols="50"></textarea><br/>
        <button onClick={() => postReview()}
        className='border-2 border-emerald-600 px-[1.1rem] py-[0.5rem] my-[0.5rem] rounded-md bg-emerald-600 text-slate-100 font-bold hover:bg-emerald-700 hover:text-slate-50 transition-all duration-300 ease-in-out'
        >Submit Review</button>
      </div>
    </div>}
    </div>
  )
};

export default CustomerReviews;