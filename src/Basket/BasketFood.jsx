import React, { useState } from 'react';
import './BasketFood.css';
import api from '../Header/API'

const BASE_URL = 'http://127.0.0.1:8000'

const BasketFood = ({foodID, lst ,id}) => {
  const amount = lst[0];
  const [newAmount, setnewAmount] = useState(lst[0]);

  const handleIncrement = () => { setnewAmount(newAmount + 1); };
  const handleDecrement = () => { if (newAmount > 0) { setnewAmount(newAmount - 1);} };

  async function confirmChanges() {
    if (newAmount != amount){
      try {
        const addData = {
          customer_id: id,
          food_id: lst[1],
          quantity: amount,
          size: lst[4],
          new_quantity: newAmount
        }

        const response = await api.put(`${BASE_URL}/basket/food/quantity`, addData)
        alert(response.data)
        window.location.reload();
        setIsLoading(false)
      } catch (error) {
        console.log("error",error)
      }
    }
  };

  async function confirmDelete() {
    try {
      const addData = {
        customer_id: id,
        food_id: lst[1],
        quantity: amount,
        size: lst[4],
        new_quantity: 0
      }

      const response = await api.put(`${BASE_URL}/basket/food/quantity`, addData)
      alert(response.data)
      window.location.reload();
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  };

  return (
        <div className="food-item">
            <span className="food-name font-medium text-white bg-slate-600 rounded-md px-[0.6rem] py-[0.3rem]">{lst[2]}</span>
            <div className="amount-control">
                <button className="btn text-slate-800" onClick={handleDecrement}>-</button>
                    <span className="amount className='font-medium text-slate-600 bg-white rounded-md px-[0.6rem] py-[0.3rem]">{newAmount}</span>
                <button className="btn text-slate-800" onClick={handleIncrement}>+</button>
            </div>
            <div
            className='font-medium text-white bg-orange-400 rounded-md px-[0.6rem] py-[0.3rem]'
            >{lst[4]}</div>
            <button style={{margin:"10px"}} onClick={confirmChanges} 
            className='font-medium text-white bg-slate-600 rounded-md px-[0.6rem] py-[0.3rem]'
            >change quantity</button>
            <button onClick={confirmDelete}
            className='font-medium text-white bg-red-600 rounded-md px-[0.6rem] py-[0.3rem]'
            >Delete</button>
        </div>
  );
};

export default BasketFood;
