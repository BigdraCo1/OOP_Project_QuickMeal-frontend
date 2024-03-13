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
      const response = await api.post(`${BASE_URL}/cancel_by_customer/${id}/${orderId}`)
      alert(response.data.message)
    } catch (error){
      console.log("error",error)
    }
  }

    return (
      <>
        { isLoading && <div>.....Loading.....</div> }
        { !isLoading &&
        <div>
            <HomeButton id={id}/>
            <ProfileButton id={id}/>
            <h1 className='midText'>Order Detail</h1>
            <h2 className='midText'>Order ID : {detail.Order_ID}</h2>
            <h2 className='midText'>Rider : {detail.Rider}</h2>
            <h2 className='midText'>Restaurant : {detail.Restaurant}</h2>
            <h2 className='midText'>State : {detail.Order_State}</h2>
            <h2 className='midText'>Payment : {detail.Payment}</h2>
            <h2 className='midText'>Food : </h2>
            {detail.Food.map((item) => (
                <h3 className='midText'>{item}</h3>
            ))}
              <div className='midText' onClick={handleCancel} > 
                <Link to={`/${id}/Profile`}>
                  <button>Cancel</button> 
                </Link>
              </div>
        </div> 
          }
      </>
    )
  };
  
  export default CustomerCurrentOrderDetail;