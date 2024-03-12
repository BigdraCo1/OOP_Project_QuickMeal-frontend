import React, { useState, useEffect } from 'react';
import './ChooseAddress.css'
import { useParams } from "react-router-dom";
import api from '../Header/API'
import AddressComponent from './AddressComponent';
import BasketButton from '../components/BasketButton';

const BASE_URL = 'http://127.0.0.1:8000'

function ChooseAddress(){
  const { id } = useParams()
  const [address, setAddress]= useState({})
  const [isLoading, setIsLoading]= useState(true)

  async function ShowAddress() {
    try {
      const response = await api.get(`${BASE_URL}/basket/address/${id}`)
      setAddress(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowAddress()}, []);

  async function addAddress() {
    const newAddress = document.getElementById("newAddress").value;
  
    if (!newAddress) {
      alert("Please enter Address");
      return;
    }

    try { 
      const addAddressData = {
        customer_id: id,
        address: newAddress
      }

      const response = await api.post(`${BASE_URL}/basket/add/address`, addAddressData)
      alert(response.data)
      window.location.reload();
    } catch (error) {
      console.log("error",error)
    }
  }

    return (
      <div className='mx-[8rem] py-[4rem] bg-slate-300 shadow-2xl h-screen'>
        { isLoading && <div>.....Loading.....</div> }
        { !isLoading &&
        <div>
          <BasketButton id={id}/>
          <div className='midText'>
            <h1 className='text-[2rem] text-emerald-600 font-bold'>Address</h1>
          </div>
          {address.map((item, index) => (
            <div key = {index}>
              <div className='midText'> <AddressComponent address={item} id = {id}/> </div>
            </div>
          ))}
          <div className='midText p-[0.2rem] border-none'>
            <textarea id="newAddress" name="newAddress" rows="2" cols="36"></textarea><br/>
          </div>
          <div className='midText'>
            <button className='bg-emerald-500 hover:bg-emerald-700 text-slate-100 hover:text-slate-50
            font-bold my-[1rem] py-[0.5rem] px-[6rem] rounded-md transition-all duration-300 ease-in-out'
            onClick={() => addAddress()}>Add address</button>
          </div>
        </div> 
        }
      </div>
    )
  };
  
  export default ChooseAddress;