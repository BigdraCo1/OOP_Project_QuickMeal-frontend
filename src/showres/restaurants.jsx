import React, { useState, useEffect } from 'react';
import './restaurants.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function Restaurants(){
  const [restaurants, setRestaurants] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowAllRes() {
    try {
      const response = await axios.get(`${BASE_URL}/show/restaurant`)
      setRestaurants(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  
  useEffect(() => {ShowAllRes()}, []);

  return (
    <>
    { isLoading && <div>.....Loading.....</div> }
    { !isLoading && 
    <div>
      <HomeButton/>
      <BasketButton/>
      <div class="midText">
        <h1>List of Restaurants</h1>
      </div>
      <div className='container'>
        {restaurants.map( (restaurant, index) => (
          <div key={index}>
            <Link to = {`/show/${restaurant._Restaurant__restaurant_id}/menu`}>
              <RestaurantCard name = {restaurant._Restaurant__name_restaurant}
              rating = {restaurant._Restaurant__rate}
              location = {restaurant._Restaurant__restaurant_location} />
            </Link>
          </div>
        ))}
      </div>
    </div>}
    </>
  )
};

export default Restaurants;