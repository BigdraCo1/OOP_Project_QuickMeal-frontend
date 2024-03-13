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
      <div
      className='flex justify-center bg-gradient-to-b from-green-500 to-lime-500 min-h-screen'
      >
      { isLoading && <div>.....Loading.....</div> }
      { !isLoading &&
        <div className='bg-slate-100 w-8/12 shadow-2xl h-screen'>
          <HomeButton id={id}/>
          <div>
          <div className='midText'>
            <h1 className='text-slate-100 bg-emerald-600 text-[2rem] rounded-md 
            shadow-xl font-bold px-[6rem] my-[0.5rem]'>Basket</h1>
          </div>
          <div className='flex justify-center'>
            {(Object.keys(basket).length === 0) && 
            <div className='font-bold rounded-lg border-2 border-slate-600 w-[360px] p-[1rem]'>
                <div className='midText'> <h2>There's No Order In Your Basket Yet! </h2> </div>
                <div className='midText'> <h2>Add Something!</h2> </div>
            </div>
            }
          </div>
          {!(Object.keys(basket).length === 0) &&
          <div className='flex flex-col justify-center items-center'>
            <div className='border-2 border-slate-600 rounded-lg px-[0.5rem] mb-[0.5rem]'>
            {Object.entries(basket).map( ([key, value])  => (
                  <div key = {key}>
                    <div className='midText'>
                      {((key !== "total") && (key !== "address")) &&
                          <BasketFood foodID = {key} lst = {value} id = {id}/>
                      }
                    </div>
                  </div>
            ))}
            </div>
            <div className='flex flex-col text-slate-50 bg-slate-600 w-[500px] p-[0.5rem] rounded-lg'>
              <div className='midText text-[1.2rem] font-medium p-[0.5rem] mb-[0.5rem] border-2 border-slate-200 rounded-lg'> <h3>Total Amount : {basket.total} ฿</h3> </div>
              <div className='p-[0.5rem] border-2 border-slate-200 rounded-lg'>
                <div className='text-center text-[1.2rem] font-medium'> <h3>Your Order Address :</h3></div>
                <div className='text-center text-[1.2rem] font-medium'>{basket.address}</div>
              </div>
            </div>
            <div className='midText'> <Link to = {`/${id}/basket/choose_address`}> 
              <button className='addAddress my-[1rem] text-[1.2rem] font-medium w-[200px]'
              >Add Address</button> </Link>
            </div>
            {(basket.address !== null) &&
              <div className='midText'> <button className='confirm' onClick={() => Comfirm()}>Confirm Order</button> </div>
            } 
          </div>
          }
        </div>
        </div>} 
      </div>
    )
  };
  
  export default Basket;