import React, { useState, useEffect } from 'react';
import './OrderHistory.css'
import { useParams } from 'react-router-dom'
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';
import ProfileButton from '../components/ProfileButton'
import api from '../Header/API'
import FinishOrderCard from '../components/FinishOrderCard'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerOrderHistory(){
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
    <div
    className='text-emerald-600 border-2 border-slate-400 bg-slate-200 my-[1rem] px-[1rem] py-[0.4rem] rounded-lg'
    >
      <HomeButton id={id}/>
      <BasketButton id={id}/>
      <ProfileButton id={id}/>
      <div>
        <h1 
        className='midText text-[1.5rem] font-bold'
        >Order History</h1>
        { !(orders.data === "No current order") &&
          <div
          className='border-2 border-slate-500 rounded-md'
          >
            {orders.data.map((item, index) => (
            <div key={index}>
              <FinishOrderCard orderID = {item.Order_ID} state = {item.Order_State} id = {id} />
            </div>
            ))}
          </div>
        }
      </div>
    </div>}
    </div>
  )
};

export default CustomerOrderHistory;