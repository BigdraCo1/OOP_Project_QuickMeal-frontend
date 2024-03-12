import React, { useState, useEffect } from 'react';
import './CurrentOrder.css'
import { useParams } from 'react-router-dom'
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';
import ProfileButton from '../components/ProfileButton'
import api from '../Header/API'
import OrderCard from '../components/OrderCard'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerCurrentOrder(){
  const {id} = useParams()
  const [orders, setOrder]= useState(true)
  const [isLoading, setIsLoading]= useState(true)

  async function ShowOrder() {
    try {
      const response = await api.get(`${BASE_URL}/show/order_list/${id}`)
      setOrder(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowOrder()}, []);

  return (
    <div className='flex justify-center'>
    { isLoading && <div>.....Loading.....</div> }
    { !isLoading && 
    <div>
      <HomeButton id={id}/>
      <BasketButton id={id}/>
      <ProfileButton id={id}/>
      <div>
        <h1 className='midText'>Current Order</h1>
        {orders.data.map((item, index) => (
        <div key={index}>
          <OrderCard orderID = {item.Order_ID} state = {item.Order_State} id = {id} />
        </div>
        ))}
      </div> 
    </div>}
    </div>
  )
};

export default CustomerCurrentOrder;