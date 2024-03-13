import React, { useState, useEffect } from 'react';
import './CustomerCurrentOrderDetail.css'
import { Link , useParams } from "react-router-dom";
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
      <div className='flex justify-center items-start
      bg-gradient-to-b from-green-500 to-lime-500 min-h-screen'>
        { isLoading && <div>.....Loading.....</div> }
        { !isLoading &&
        <div className='bg-slate-100 flex flex-col justify-start items-center py-[0.5rem] w-7/12 h-screen'>
            <HomeButton id={id}/>
            <ProfileButton id={id}/>
            <div className='py-[0.5rem] w-7/12'>
              <h1 className='midText font-bold text-[1.6rem] text-white bg-emerald-600 rounded-md'>Order Detail</h1>
              <div className='border-2 border-slate-300 my-[1rem] p-[0.5rem] rounded-md'>
                <h2 className='midText font-medium text-[1.2rem]'>Order ID : {detail.Order_ID}</h2>
                <h2 className='midText font-medium text-[1.2rem]'>Rider : {detail.Rider}</h2>
                <h2 className='midText font-medium text-[1.2rem]'>Restaurant : {detail.Restaurant}</h2>
                <h2 className='midText font-medium text-[1.2rem]'>State : {detail.Order_State}</h2>
                <h2 className='midText font-medium text-[1.2rem]'>Payment : {detail.Payment}</h2>
                <h2 className='midText font-medium text-[1.2rem]'>Food : </h2>
                <div className='border-2 border-slate-300 rounded-md'>
                {detail.Food.map((item) => (
                    <h3 className='midText font-medium text-[1.2rem]'>{item}</h3>
                ))}
                </div>
              </div>
            </div>
              <div className='midText border-2 bg-red-600 rounded-md border-red-600 py-[0.2rem] w-7/12' onClick={handleCancel} > 
                <Link to={`/${id}/Profile`}>
                  <button className='font-bold text-[1.2rem] text-white bg-red-600'>Cancel</button> 
                </Link>
              </div>
        </div> 
          }
      </div>
    )
  };
  
  export default CustomerCurrentOrderDetail;