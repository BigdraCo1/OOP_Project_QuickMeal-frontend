import React from 'react';
import './AddressComponent.css';
import api from '../Header/API'
import { Link } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:8000'

function AddressComponent({ address , id}) {
    async function ChooseAddress() {
        try {
          const addressData = {
            customer_id: id,
            address: address
          }
          const response = await api.post(`${BASE_URL}/basket/add/address`, addressData)
          alert(response.data)
        } catch (error) {
          console.log("error",error)
        }
      };

      async function DeleteAddress() {
        try {
          const response = await api.delete(`${BASE_URL}/basket/delete/address/${id}/${address}`)
          alert(response.data)
          window.location.reload();
        } catch (error) {
          console.log("error",error)
        }
      };

  return (
    <div className="address ">
        <Link to = {`/${id}/basket`}>
          <button 
          className='text-white font-medium px-[0.6rem] py-[0.4rem] bg-emerald-600 rounded-md'
          style={{margin:"10px"}}onClick={ChooseAddress}>Choose</button>
        </Link>
        <h3>{address}</h3>
        <button 
        className='text-white font-medium px-[0.6rem] py-[0.4rem] bg-red-600 rounded-md'
        style={{margin:"10px"}}onClick={DeleteAddress}>Delete</button>
    </div>
  );
};

export default AddressComponent;