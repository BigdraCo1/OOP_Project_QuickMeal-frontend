import React, { useState, useEffect } from 'react';
import './Menu.css'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import RestaurantTab from '../components/RestaurantTab';
import FoodCard from '../components/FoodCard';
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';


const BASE_URL = 'http://127.0.0.1:8000'

function Menu(){
  const { id } = useParams()

  const [restaurant, setRestaurant] = useState({});
  const [menus, setMenus] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowResDetail(id) {
    try {
      const response = await axios.get(`${BASE_URL}/show_restaurant_detail_by_id/${id}`)
      setRestaurant(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowResDetail(id)}, []);

  async function ShowMenus(id) {
    try {
      const response = await axios.get(`${BASE_URL}/show/${id}/menu`)
      setMenus(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowMenus(id)}, []);

    return (
      <div className='flex justify-center items-center p-[1rem]'>
      { isLoading && <div>.....Loading.....</div> }
      { !isLoading &&
        <div className='bg-slate-200 shadow-lg rounded-md'>
          <HomeButton/>
          <BasketButton/>
          <div className='container '>
            <RestaurantTab name={restaurant.Restaurant_Name} rating={restaurant.Rate} 
              location={restaurant.Restaurant_Location}  />
          </div>
          <div className='container'>
            <Link to={`/review/show/${id}`}>
              <button className='review-button shadow-md'>Review</button>
            </Link>
          </div>
          <h1 className='text-slate-600 text-[1.2rem] font-bold text-center' 
          // style={{textAlign: "center", color: "white"}}
          >Menu</h1>
          <div className='container'>
            {Object.entries(menus).map(([key, [name, price]]) => (
              <div key={key}>
                <Link to={`/show/${key}/detail`}>
                  <FoodCard className='food-container' name={name} price={price} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      } 
      </div>
    ) 
  };
  
  export default Menu;