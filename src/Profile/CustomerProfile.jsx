import React, { useState, useEffect } from 'react';
import './CustomerProfile.css'
import { Link, useParams } from "react-router-dom";
import api from '../Header/API'

const BASE_URL = 'http://127.0.0.1:8000'

function CustomerProfile(){
  const { id } = useParams()
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading]= useState(true)

  async function ShowProfile() {
    try {
      const response = await api.get(`${BASE_URL}/show/profile/${id}`)
      setProfileData(response.data) 
      setIsLoading(false)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {ShowProfile()}, []);

    return (
      <div className='bg-gradient-to-b from-green-500 to-lime-500 min-h-screen'>
        <div className='bg-slate-200 mx-auto max-w-[60rem] px-[2rem] py-[2rem] shadow-2xl min-h-screen'>
          {isLoading && <div className="text-center mt-[4rem]">Loading...</div>}
          {!isLoading && (
            <div className='flex flex-col p-[0.8rem] bg-slate-300 rounded-md shadow-md'>
              <div>
                <h2 className='text-center text-3xl text-white font-bold py-[0.5rem] bg-emerald-600 rounded-md '>Profile</h2>
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
              <div>
                <div>
                  <Link to={`/${id}/pocket`}>
                    <button className='text-[1.2rem] font-medium bg-emerald-600 border-emerald-600 border-4 py-[0.5rem] text-white rounded-md 
                    hover:text-emerald-600 hover:bg-slate-200 hover:font-bold w-full transition-all duration-300 ease-in-out'>Pocket</button>
                  </Link>
                </div>
                <div>
                  <Link to={`/${id}/current_order`}>
                    <button className='text-[1.2rem] font-medium bg-blue-600 border-blue-600 border-4 py-[0.5rem] mt-[0.5rem] text-white rounded-md 
                  hover:text-blue-600 hover:bg-slate-200 hover:font-bold w-full transition-all duration-300 ease-in-out'>Current Order</button>
                  </Link>
                </div>
                <div>
                  <Link to={`/${id}/order_history`}>
                    <button className='text-[1.2rem] font-medium bg-gray-600 border-gray-600 border-4 py-[0.5rem] mt-[0.5rem] text-white rounded-md 
                    hover:text-gray-600 hover:bg-slate-200 hover:font-bold w-full transition-all duration-300 ease-in-out'>Order History</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  };
  
  export default CustomerProfile;