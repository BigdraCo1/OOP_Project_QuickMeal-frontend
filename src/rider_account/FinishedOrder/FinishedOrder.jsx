import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import RiderHomeButton from '../RiderComponent/RiderHomeButton';

import RiderHomeBurron from '../RiderComponent/RiderHomeBurron.jsx';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderFinishedOrder() {
    const { rider_id } = useParams();
    const [riderProfile, setRiderProfile] = useState(null);
    const [riderFinishedOrder, setRiderFinishedOrder] = useState({ data: [] });

    async function fetchRiderProfile(rider_id) {
        try {
            const profile_response = await api.get(`${BASE_URL}/show/profile/${rider_id}`);
            if (profile_response.data) {
                setRiderProfile(profile_response.data);
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }
    async function fetchRiderFinishedOrder(rider_id) {
        try {
            const finished_order_response = await api.get(`${BASE_URL}/rider/${rider_id}/show/finished_order_list`);
            if (finished_order_response.data) {
                setRiderFinishedOrder(finished_order_response.data);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
        }
    }

    useEffect(() => {
        fetchRiderProfile(rider_id);
        fetchRiderFinishedOrder(rider_id);
    }, [rider_id]);
    console.log(riderFinishedOrder);
    return (
        <div className='flex flex-col items-center h-screen'>
            <div className="flex justify-between items-center">
                <RiderHomeButton id={rider_id} />
            </div>
            <div 
            // className='profile-container'
            className='border-[0.2rem] p-[0.5rem] my-[0.5rem] rounded-lg border-slate-600 w-7/12'
            >
                {riderProfile && (
                    <div className='bg-slate-100 p-[0.5rem] rounded-md'>

                        <div 
                        className='bg-red-600 text-center font-bold text-[1.6rem] text-white py-[0.5rem] rounded-md'
                        >
                            <h2>Profile Information</h2>
                        </div>

                        <div>
                            <RiderHomeBurron id={rider_id} />
                        </div>

                        {/* <p>Username: {riderProfile.Username}</p>
                        <p>Fullname: {riderProfile.Fullname}</p>
                        <p>Email: {riderProfile.Email}</p>
                        <p>Phone: {riderProfile.Phone}</p> */}

                        <div className='font-bold text-[1.2rem] grid grid-cols-2 my-[0.5rem]'>
                            <p className='text-right pr-[0.5rem]'>Username :</p>
                            <p className='text-left'>{riderProfile.Username}</p>
                            <p className='text-right pr-[0.5rem]'>Fullname :</p>
                            <p className='text-left'>{riderProfile.Fullname}</p>
                            <p className='text-right pr-[0.5rem]'>Email :</p>
                            <p className='text-left'>{riderProfile.Email}</p>
                            <p className='text-right pr-[0.5rem]'>Phone :</p>
                            <p className='text-left'>{riderProfile.Phone}</p>
                        </div>

                        <div className='flex justify-center'>
                            <Link to={`/rider_account/${rider_id}/pocket`}>
                                <button className="button text-[1.2rem] text-medium">
                                    Pocket
                                </button>
                            </Link>
                        </div>

                    </div>
                )}
            </div>

            <div
            className='border-[0.2rem] p-[0.5rem] my-[0.5rem] rounded-lg border-slate-600 w-7/12'
            >   

                <div className='text-center text-[1.2rem] p-[0.5rem] font-bold bg-slate-100 rounded-md'>
                    <h1>Finished Order</h1>
                </div>

                <div
                className='border-2 border-slate-600 rounded-md p-[0.5rem] mt-[0.5rem]'
                >
                {riderFinishedOrder.data.map(order => (
                    <div key={order.Order_ID}>
                        <Link to={`/rider_account/${rider_id}/finished_order/${order.Order_ID}`}>
                            <button 
                            className='w-full text-center text-[1.2rem] rounded-md bg-slate-200 border-2 border-slate-600 py-[1.2rem] font-medium my-[0.3rem]'
                            // className='order-button' 
                            key={order.Order_ID}>
                                <p>Order ID: {order.Order_ID}</p>
                                <p>Order State: {order.Order_State}</p>
                            </button>
                        </Link>
                    </div>
                ))}
                </div>
            </div> 
        </div>
    )
}

export default RiderFinishedOrder;