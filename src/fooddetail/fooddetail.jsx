import React, { useState, useEffect } from 'react';
import './fooddetail.css'
import { Link, useParams } from "react-router-dom";
import api from '../Header/API'
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function FoodDetail(){
  const { id,foodId } = useParams()

  const [fooddetail, setFooddetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [isLoading, setIsLoading]= useState(true)

  async function ShowFoodDetail(foodId) {
    try {
      const response = await api.get(`${BASE_URL}/show/${foodId}/detail`)
      setFooddetail(response.data) 
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowFoodDetail(foodId)}, []);

  function handleQuantityChange(change){
    setQuantity(prevQuantity => Math.max(prevQuantity + change, 1));
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  async function addToBasket (){
    setQuantity(1)

    const AddData = {
      customer_id: id,
      food_id: foodId,
      size: selectedSize,
      quantity: quantity
    }

    try {
      const response = await api.post(`${BASE_URL}/basket/add/food`, AddData)
      alert(response.data) 
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  };

    return (
      <>
      { isLoading && <div>.....Loading.....</div> }
      { !isLoading && <div className='midText'>
        <HomeButton id = {id}/>
        <BasketButton id = {id}/>
        <div className='detailbox'>
        <h2>{fooddetail.food_name}</h2>
        <h3>{fooddetail.food_type}</h3>
        <h3>{fooddetail.food_price} ฿</h3>
        <div>
          {Object.entries(fooddetail.food_size).map(([size, cost]) => (
            <div key={size}>
              <label>
              <input type="radio" value={size} checked={selectedSize === size} onChange={handleSizeChange} />
                {size}  +  {cost} ฿
              </label>
            </div>
          ))}
        </div>
        <div className="quantity">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button onClick={addToBasket}>Add to Basket</button>
      </div>
      </div>} 
    </>  
    ) 
  };
  
  export default FoodDetail;