import React, { useState, useEffect } from 'react';
import './Profile.css'
import { Link, useParams } from "react-router-dom";
import api from '../../api/api'
import ResAccHomeButton from '../RestaurantAccComponents/ResAccHomeButton';


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
      <div className='bg-gradient-to-b from-green-500 to-blue-500 min-h-screen'>
      <div 
      // className='border-2 bg-slate-200 mx-auto max-w-[60rem] px-[3rem] py-[2rem] shadow-2xl min-h-screen'
      className='bg-slate-200 mx-auto max-w-[60rem] px-[2rem] py-[2rem] shadow-2xl min-h-screen'
      >
        {isLoading && <div className="text-center mt-[4rem]">Loading...</div>}
        {!isLoading && (
          <div 
          className='flex flex-col'
          
          >
            <div className="flex justify-between items-center">
                <ResAccHomeButton id={account_id} />
            </div>
            <div>
              <h2 
              // className='text-center text-3xl font-bold mb-4'
              className='text-center text-3xl text-white font-bold 
              py-[0.5rem] bg-emerald-600 rounded-md '
              >
                Profile
              </h2>
              <div className='my-[0.5rem]'>
                  <div className="grid grid-cols-2 gap-x-[0.5rem] gap-y-[0.5rem] border-2 border-slate-600 mt-[0.5rem] py-[0.5rem] rounded-md">
                    <div className='text-right pr-[0.2rem] text-[1.1rem] font-medium'>Username :</div>
                    <div className='text-left pl-[0.2rem] text-[1.1rem] font-medium'>{profileData.Username}</div>
                    <div className='text-right pr-[0.2rem] text-[1.1rem] font-medium'>Fullname :</div>
                    <div className='text-left pl-[0.2rem] text-[1.1rem] font-medium'>{profileData.Fullname}</div>
                    <div className='text-right pr-[0.2rem] text-[1.1rem] font-medium'>Email :</div>
                    <div className='text-left pl-[0.2rem] text-[1.1rem] font-medium'>{profileData.Email}</div>
                    <div className='text-right pr-[0.2rem] text-[1.1rem] font-medium'>Phone :</div>
                    <div className='text-left pl-[0.2rem] text-[1.1rem] font-medium'>{profileData.Phone}</div>
                  </div>
                </div>
            </div>
            {/* <div className='flex flex-col justify-center mt-6 space-x-4'>
              <div className="flex justify-center pl-[1rem]">
                <Link to={`/restaurant_account/${account_id}/pocket`}>
                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-md 
                  hover:bg-emerald-700 w-[12rem] m-[0.2rem]'>Pocket</button>
                </Link>
              </div>
            </div> */}
            <div>
              <div>
                <Link to={`/restaurant_account/${account_id}/pocket`}>
                  <button className='text-[1.2rem] font-medium bg-emerald-600 border-emerald-600 border-4 py-[0.5rem] text-white rounded-md 
                  hover:text-emerald-600 hover:bg-slate-200 hover:font-bold w-full transition-all duration-300 ease-in-out'>Pocket</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    )
  };
  
  export default RestaurantProfile;