import React, { useState } from 'react';
import './BasketFood.css';
import axios from 'axios';
import { global_customer_id } from '/src/global.jsx'

const BASE_URL = 'http://127.0.0.1:8000'

const BasketFood = ({foodID, lst}) => {
  const amount = lst[0];
  const [newAmount, setnewAmount] = useState(lst[0]);

  const handleIncrement = () => { setnewAmount(newAmount + 1); };
  const handleDecrement = () => { if (newAmount > 0) { setnewAmount(newAmount - 1);} };

  async function confirmChanges() {
    if (newAmount != amount){
      try {
        const addData = {
          customer_id: global_customer_id,
          food_id: lst[1],
          quantity: amount,
          size: lst[4],
          new_quantity: newAmount
        }

        const response = await axios.put(`${BASE_URL}/basket/food/quantity`, addData)
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
        customer_id: global_customer_id,
        food_id: lst[1],
        quantity: amount,
        size: lst[4],
        new_quantity: 0
      }

      const response = await axios.put(`${BASE_URL}/basket/food/quantity`, addData)
      alert(response.data)
      window.location.reload();
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  };

  return (
        <div className="food-item">
            <span className="food-name">{lst[2]}</span>
            <div className="amount-control">
                <button className="btn" onClick={handleDecrement}>-</button>
                    <span className="amount">{newAmount}</span>
                <button className="btn" onClick={handleIncrement}>+</button>
            </div>
            <div>{lst[4]}</div>
            <button style={{margin:"10px"}}onClick={confirmChanges}>change quantity</button>
            <button onClick={confirmDelete}>Delete</button>
        </div>
  );
};

export default BasketFood;
