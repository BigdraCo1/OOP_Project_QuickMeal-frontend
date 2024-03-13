import React, { useState, useEffect } from 'react';
import './fooddetail.css'
import { Link, useParams } from "react-router-dom";
import api from '../Header/API'
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerFoodDetail(){
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
        <h2 className='text-[1.5rem] font-bold'>{fooddetail.food_name}</h2>
        <h3 className='text-[1.2rem]'>{fooddetail.food_type}</h3>
        <h3 className='text-[1.2rem]'>{fooddetail.food_price} ฿</h3>
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
        <button className='text-slate-700 text-[1.1rem] font-bold bg-slate-300 
          border-2 border-slate-300 px-[1rem] py-[0.2rem] rounded-md shadow-md
          hover:bg-slate-400 hover:border-slate-400 hover:shadow-lg hover:text-slate-200
          transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105'
          onClick={addToBasket}>Add to Basket</button>
      </div>
      </div>} 
    </>  
    ) 
  };
  
  export default CustomerFoodDetail;