import React, { useState, useEffect } from 'react';
import './review.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import RestaurantTab from '../components/RestaurantTab';
import ReviewCard from '../components/ReviewCard';
import { global_customer_id } from '/src/global.jsx'
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function Reviews(){
  const { id } = useParams()

  const [reviews, setReviews] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowResDetail() {
    try {
      const response = await axios.get(`${BASE_URL}/show_restaurant_detail_by_id/${id}`)
      setRestaurant(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowResDetail()}, []);

  async function ShowReviews() {
    try {
      const response = await axios.get(`${BASE_URL}/review/show/${id}`)
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
    const customerID = global_customer_id;
    const comment = document.getElementById("comment").value;
    const rating = parseInt(document.getElementById("rating").value);
  
    if (!comment || !rating) {
      alert("Please enter both comment and rating!");
      return;
    }

    const reviewData = {
      customer_id: customerID,
      rating: rating,
      comment: comment,
      restaurant_id: id
    };
  
    try {
      const response = await axios.post(`${BASE_URL}/review/add`, reviewData)
      alert(response.data)
      window.location.reload();
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <>
    { isLoading && <div>.....Loading.....</div> }
    { !isLoading && 
    <div>
      <HomeButton/>
      <div className='container'>
          <RestaurantTab name = {restaurant.Restaurant_Name} rating = {restaurant.Rate} 
            location = {restaurant.Restaurant_Location} />
      </div>
      <div className='container'>
        <h1> {renderStars(Math.floor(restaurant.Rate), "")} </h1>
      </div>
      <div className='container'>
        {Object.entries(reviews).map(([key, [rate, comment]]) => (
            <div key = {key} style={{marginBottom:"20px"}}>
                <ReviewCard className='food-container' name = {key} comment = {renderStars(Math.floor(rate), comment)}/>
            </div>
        ))}
      </div>
      <div className="container">
        <label for="rating" >Rating:</label><br/>
        <input type="number" id="rating" name="rating" min="1" max="5"/><br/>
        <textarea id="comment" name="comment" rows="1" cols="50"></textarea><br/>
        <button onClick={() => postReview()}>Submit Review</button>
      </div>
    </div>}
    </>
  )
};

export default Reviews;