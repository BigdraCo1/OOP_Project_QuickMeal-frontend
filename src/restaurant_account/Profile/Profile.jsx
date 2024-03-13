import React, { useState, useEffect } from 'react';
import './Profile.css'
import { Link, useParams } from "react-router-dom";
import api from '../../api/api'
import ResHomeButton from '../RestaurantComponents/ResHomeButton';


const BASE_URL = 'http://127.0.0.1:8000'

function RestaurantProfile(){
  const { account_id } = useParams()
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowProfile() {
    try {
      const response = await api.get(`${BASE_URL}/show/profile/${account_id}`)
      setProfileData(response.data) 
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowProfile()}, []);

    return (
      <div className='border-2 bg-slate-200 mx-auto max-w-[60rem] px-[3rem] py-[2rem] shadow-2xl min-h-screen'>
        {isLoading && <div className="text-center mt-8">Loading...</div>}
        {!isLoading && (
          <div className='flex flex-col'>
            <div className="flex justify-between items-center">
                <ResHomeButton id={account_id} />
              </div>
            <h2 className='text-center text-3xl font-bold mb-4'>Profile</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <div className='text-right pr-4'>Username :</div>
              <div className='text-left pl-1'>{profileData.Username}</div>
              
              <div className='text-right pr-4'>Fullname :</div>
              <div className='text-left pl-1'>{profileData.Fullname}</div>
              
              <div className='text-right pr-4'>Email :</div>
              <div className='text-left pl-1'>{profileData.Email}</div>
              
              <div className='text-right pr-4'>Phone :</div>
              <div className='text-left pl-1'>{profileData.Phone}</div>
            </div>
            <div className='flex flex-col justify-center mt-6 space-x-4'>
              <div className="flex justify-center pl-[1rem]">
                <Link to={`/restaurant_account/${account_id}/pocket`}>
                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-md 
                  hover:bg-emerald-700 w-[12rem] m-[0.2rem]'>Pocket</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  };
  
  export default RestaurantProfile;