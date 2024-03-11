import React from 'react';
import './AddressComponent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_customer_id } from '/src/global.jsx'

const BASE_URL = 'http://127.0.0.1:8000'
const customer_id = global_customer_id

function AddressComponent({ address }) {
    async function ChooseAddress() {
        try {
          const addressData = {
            customer_id: customer_id,
            address: address
          }
          const response = await axios.post(`${BASE_URL}/basket/add/address`, addressData)
          alert(response.data)
        } catch (error) {
          console.log("error",error)
        }
      };

      async function DeleteAddress() {
        try {
          const response = await axios.delete(`${BASE_URL}/basket/address/${customer_id}/${address}`)
          alert(response.data)
          window.location.reload();
        } catch (error) {
          console.log("error",error)
        }
      };

  return (
    <div className="address">
        <Link to = {`/basket/${customer_id}`}>
          <button style={{margin:"10px"}}onClick={ChooseAddress}>Choose</button>
        </Link>
        <h3>{address}</h3>
        <button style={{margin:"10px"}}onClick={DeleteAddress}>Delete</button>
    </div>
  );
};

export default AddressComponent;