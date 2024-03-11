import React, { useState, useEffect } from 'react';
import './OrderHistory.css'
import { useParams } from 'react-router-dom'
import BasketButton from '../components/BasketButton';
import HomeButton from '../components/HomeButton';
import ProfileButton from '../components/ProfileButton'
import api from '../Header/API'

const BASE_URL = 'http://127.0.0.1:8000'

function OrderHistory(){
  const {id} = useParams()
  const [isLoading, setIsLoading]= useState(true)

  async function ShowOrder() {
    try {
      const response = await api.get(`${BASE_URL}/show/order_list/${id}`)
      setOrder(response.data)
      console.log(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowOrder()}, []);

  return (
    <>
    { isLoading && <div>.....Loading.....</div> }
    { !isLoading && 
    <div>
      <HomeButton id={id}/>
      <BasketButton id={id}/>
      <ProfileButton id={id}/>
    </div>}
    </>
  )
};

export default OrderHistory;