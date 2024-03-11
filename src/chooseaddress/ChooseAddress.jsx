import React, { useState, useEffect } from 'react';
import './ChooseAddress.css'
import { useParams } from "react-router-dom";
import axios from 'axios';
import AddressComponent from './AddressComponent';
import BasketButton from '../components/BasketButton';
import { global_customer_id } from '/src/global.jsx'

const BASE_URL = 'http://127.0.0.1:8000'

function ChooseAddress(){
  const { id } = useParams()
  const [address, setAddress]= useState({})
  const [isLoading, setIsLoading]= useState(true)

  async function ShowAddress(CustomerId) {
    try {
      const response = await axios.get(`${BASE_URL}/basket/address/${CustomerId}`)
      setAddress(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowAddress(id)}, []);

  async function addAddress() {
    const customerID = global_customer_id;
    const newAddress = document.getElementById("newAddress").value;
  
    if (!newAddress) {
      alert("Please enter Address");
      return;
    }

    try {
      const addAddressData = {
        customer_id: customerID,
        address: newAddress
      }

      const response = await axios.post(`${BASE_URL}/basket/add/address`, addAddressData)
      alert(response.data)
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
          <BasketButton/>
          <div className='midText'> <h1>Address</h1> </div>
          {address.map((item, index) => (
            <div key = {index}>
              <div className='midText'> <AddressComponent address={item}/> </div>
            </div>
          ))}
          <div className='midText'> <textarea id="newAddress" name="newAddress" rows="1" cols="50"></textarea><br/> </div>
          <div className='midText'> <button onClick={() => addAddress()}>Add address</button> </div>
        </div> 
          }
      </>
    )
  };
  
  export default ChooseAddress;