import React, { useState, useEffect } from 'react';
import './CustomerProfile.css'
import { useParams } from "react-router-dom";
import axios from 'axios';
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerProfile(){
  const { id } = useParams()
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowProfile() {
    try {
      const response = await axios.get(`${BASE_URL}/show/${id}/detail`)
      setFooddetail(response.data) 
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowProfile()}, []);

    return (


      <>
        { isLoading && <div>.....Loading.....</div> }
        { !isLoading &&
        <div>
            <h1>Hello {id}</h1>
        </div> 
          }
      </>
    )
  };
  
  export default CustomerProfile;