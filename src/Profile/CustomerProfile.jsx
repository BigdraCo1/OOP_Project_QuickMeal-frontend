import React, { useState, useEffect } from 'react';
import './CustomerProfile.css'
import { Link, useParams } from "react-router-dom";
import api from '../Header/API'
import HomeButton from '../components/HomeButton';

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerProfile(){
  const { id } = useParams()
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowProfile() {
    try {
      const response = await api.get(`${BASE_URL}/show/profile/${id}`)
      setProfileData(response.data) 
      console.log(response.data)
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
            <HomeButton id={id}/>
            <h1 className='midText'>Profile</h1>
            <h2 className='midText'>Username : {profileData.Username}</h2>
            <h2 className='midText'>Fullname : {profileData.Fullname}</h2>
            <h2 className='midText'>Email : {profileData.Email}</h2>
            <h2 className='midText'>Phone : {profileData.Phone}</h2>
            <div className='midText'>
              <Link to = {`/${id}/pocket`}>
                <button >Pocket</button>
              </Link>
              <Link to = {`/${id}/current_order`}>
                <button style={{margin:"10px"}}>On-going Order</button>
              </Link>
              <Link to = {`/${id}/order_History`}>
                <button >Order History</button>
              </Link>
            </div>
        </div> 
          }
      </>
    )
  };
  
  export default CustomerProfile;