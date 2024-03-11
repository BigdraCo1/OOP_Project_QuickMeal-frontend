import React, { useState, useEffect } from 'react';
import './restaurants.css'
import { Link, useParams } from 'react-router-dom'
import RestaurantCard from '../components/RestaurantCard';
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';
import ProfileButton from '../components/ProfileButton'
import api from '../Header/API'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerRestaurants(){
  const {id} = useParams()
  const [restaurants, setRestaurants] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowAllRes() {
    try {
      const response = await api.get(`${BASE_URL}/show/restaurant`)
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
      <HomeButton id={id}/>
      <BasketButton id={id}/>
      <ProfileButton id={id}/>
      <div className="midText">
        <h1>List of Restaurants</h1>
      </div>
      <div className='container'>
        {restaurants.map( (restaurant, index) => (
          <div key={index}>
            <Link to = {`/${id}/show/${restaurant._Restaurant__restaurant_id}/menu`}>
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

export default CustomerRestaurants;