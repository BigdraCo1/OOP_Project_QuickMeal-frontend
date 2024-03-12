import React, { useState, useEffect } from 'react';
import './CustomerCurrentOrderDetail.css'
import { useParams } from "react-router-dom";
import api from '../Header/API'
import HomeButton from '../components/HomeButton';
import ProfileButton from '../components/ProfileButton'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerCurrentOrderDetail(){
  const { id, orderId } = useParams()
  const [detail, setDetail]= useState(true)
  const [isLoading, setIsLoading]= useState(true)

  async function ShowOrder() {
    try {
      const response = await api.get(`${BASE_URL}/show/order/detail/${orderId}`)
      setDetail(response.data) 
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowOrder()}, []);

  async function handleCancel(){
    try {
      await api.post(`${BASE_URL}/cancel_by_customer/${id}/${orderId}`)
    } catch (error){
      console.log("error",error)
    }
  }

    return (
      <div className='flex justify-center'>
        { isLoading && <div>.....Loading.....</div> }
        { !isLoading &&
        <div className='bg-slate-200 rounded-lg w-[500px] my-[2rem] p-[0.5rem] shadow-xl'>
            <HomeButton id={id}/>
            <ProfileButton id={id}/>
            <h1 className='midText text-slate-100 text-[1.2rem] font-bold 
            bg-emerald-600 rounded-md px-[0.8rem] py-[0.6rem]'
            >Order Detail</h1>
            <h2 className='midText'>Order ID : {detail.Order_ID}</h2>
            <h2 className='midText'>Rider : {detail.Rider}</h2>
            <h2 className='midText'>Restaurant : {detail.Restaurant}</h2>
            <h2 className='midText'>State : {detail.Order_State}</h2>
            <h2 className='midText'>Payment : {detail.Payment}</h2>
            <h2 className='midText'>Food : </h2>
            {detail.Food.map((item) => (
                <h3 className='midText'>{item}</h3>
            ))}
            <div className='midText' onClick={handleCancel} > <button>Cancel</button> </div>
        </div> 
          }
      </div>
    )
  };
  
  export default CustomerCurrentOrderDetail;