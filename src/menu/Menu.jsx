import React, { useState, useEffect } from 'react';
import './Menu.css'
import { Link, useParams } from "react-router-dom";
import RestaurantTab from '../components/RestaurantTab';
import FoodCard from '../components/FoodCard';
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';
import api from '../Header/API'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerMenu(){
  const { id, resId } = useParams()

  const [restaurant, setRestaurant] = useState({});
  const [menus, setMenus] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowResDetail(id) {
    try {
      const response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_id/${resId}`)
      setRestaurant(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowResDetail(id)}, []);

  async function ShowMenus(resId) {
    try {
      const response = await api.get(`${BASE_URL}/show/${resId}/menu`)
      setMenus(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowMenus(resId)}, []);

    return (
      <>
      { isLoading && <div>.....Loading.....</div> }
      { !isLoading &&
      <div>
        <HomeButton id={id}/>
        <BasketButton id={id}/>
        <div className='container'>
          <RestaurantTab name = {restaurant.Restaurant_Name} rating = {restaurant.Rate} 
            location = {restaurant.Restaurant_Location}  />
        </div>
        <div className='container'>
          <Link to = {`/${id}/review/show/${resId}`}>
            <button className='review-button'>Review</button>
          </Link>
        </div>
        <h1 style={{textAlign:"center", color:"white"}}>Menu</h1>
        <div className='container'>
          {Object.entries(menus).map(([key, [name, price]]) => (
            <div key={key}>
              <Link to = {`/${id}/show/${key}/detail`}>
                <FoodCard className='food-container' name = {name} price = {price} />
              </Link>
            </div>
          ))}
        </div>
      </div>} 
      </>  
    ) 
  };
  
  export default CustomerMenu;