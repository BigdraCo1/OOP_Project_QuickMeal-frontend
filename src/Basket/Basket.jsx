import React, { useState, useEffect } from 'react';
import './Basket.css'
import { Link, useParams } from "react-router-dom";
import api from '../Header/API'
import BasketFood from './BasketFood';
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function Basket(){
  const { id } = useParams()
  const [basket, setbasket]= useState({})
  const [isLoading, setIsLoading]= useState(true)

  async function ShowFoodDetail(id) {
    try {
      const response = await api.get(`${BASE_URL}/basket/custom/${id}`)
      setbasket(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowFoodDetail(id)}, []);

  async function Comfirm() {
    try {
      console.log("confirm")
      await api.put(`${BASE_URL}/order/confirm/${id}`)
      window.location.reload();
    } catch (error) {
      console.log("error",error)
    }
  }

    return (
      <>
      { isLoading && <div>.....Loading.....</div> }
      { !isLoading &&
      <div>
        <HomeButton id={id}/>
        <div className='midText'>
          <h1>Basket</h1>
        </div>
        {(Object.keys(basket).length === 0) && <div>
            <div className='midText'> <h2>There's No Order In Your Basket Yet! </h2> </div>
            <div className='midText'> <h2>Add Something!</h2> </div>
          </div>
        }
        {!(Object.keys(basket).length === 0) && <div>
          {Object.entries(basket).map( ([key, value])  => (
                <div key = {key}>
                  <div className='midText'>
                    {((key !== "total") && (key !== "address")) &&
                        <BasketFood foodID = {key} lst = {value} id = {id}/>
                    }
                  </div>
                </div>
          ))}
          <div className='midText'> <h3>Total Amount : {basket.total} ฿</h3> </div>
          <div className='midText'> <h3>Your Order Address : {basket.address}</h3> </div>
          <div className='midText'> <Link to = {`/${id}/basket/choose_address`}> 
            <button className='addAddress'>Add Address</button> </Link> </div>
          {(basket.address !== null) &&
            <div className='midText'> <button className='confirm' onClick={() => Comfirm()}>Confirm Order</button> </div>
          } 
          </div>
        }
      </div>} 
    </>
    )
  };
  
  export default Basket;