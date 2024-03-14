import React, { useState, useEffect } from 'react';
import './CustomerFinishOrderDetail.css'
import { useParams } from "react-router-dom";
import api from '../Header/API'
import HomeButton from '../components/HomeButton';
import ProfileButton from '../components/ProfileButton'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerFinishOrderDetail(){
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

  

    return (
      <div className='bg-gradient-to-b from-green-500 to-lime-500 min-h-screen'>
      <div
      className='h-screen flex flex-col justify-start items-center'
      // className='flex flex-col items-center h-screen'
      >
        <div className='w-1/2'>
        { isLoading && <div>.....Loading.....</div> }
        { !isLoading &&
        <div
        className='mt-[1rem] p-[1rem] font-medium rounded-md bg-white flex flex-col justify-center w-full'
        >
            <HomeButton id={id}/>
            <ProfileButton id={id}/>

            <div className='text-center rounded-md font-medium text-[1.2rem] bg-red-600 text-white px-[0.5rem] my-[0.5rem]'>
                <h1>Order Detail</h1>
            </div>

            {/* <h1 className='midText'>Order Detail</h1> */}

            <div className='grid grid-cols-2'>
            
            <p 
            // className='midText'
            className='text-right pr-[0.5rem]'
            >Order ID :</p>
            <p className='text-left'>{detail.Order_ID}</p>
            <p 
            // className='midText'
            className='text-right pr-[0.5rem]'
            >Rider : {detail.Rider}</p>
            <p className='text-left'>{detail.Order_ID}</p>
            <p 
            // className='midText'
            className='text-right pr-[0.5rem]'
            >Restaurant : {detail.Restaurant}</p>
            <p className='text-left'>{detail.Order_ID}</p>
            <p  
            // className='midText'
            className='text-right pr-[0.5rem]'
            >State : {detail.Order_State}</p>
            <p className='text-left'>{detail.Order_ID}</p>
            <p 
            // className='midText'
            className='text-right pr-[0.5rem]'
            >Payment : {detail.Payment}</p>
            <p className='text-left'>{detail.Order_ID}</p>
            <p 
            // className='midText'
            className='text-right pr-[0.5rem]'
            >Food : </p>
            <p>
            {detail.Food.map((item) => (
                <p 
                // className='midText'
                className='text-left'
                >{item}</p>
            ))}
            </p>

            </div>
        </div> 
          }
          </div>
      </div>
      </div>
    )
  };
  
  export default CustomerFinishOrderDetail;