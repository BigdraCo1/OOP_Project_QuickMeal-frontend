import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

import RiderHomeBurron from '../RiderComponent/RiderHomeBurron.jsx';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderRequestOrder() {
    const { rider_id } = useParams();
    const [riderProfile, setRiderProfile] = useState(null);
    const [riderRequestOrder, setRiderRequestOrder] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRiderProfile(rider_id) {
        try {
            setIsLoading(true);
            const profile_response = await api.get(`${BASE_URL}/show/profile/${rider_id}`);
            if (profile_response.data) {
                setRiderProfile(profile_response.data);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchRiderRequestOrder(rider_id) {
        try {
            setIsLoading(true);
            const request_order_response = await api.get(`${BASE_URL}/rider/${rider_id}/show/recieved_order_list`);
            if (request_order_response.data) {
                setRiderRequestOrder(request_order_response.data);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchRiderProfile(rider_id);
        fetchRiderRequestOrder(rider_id);
    }, [rider_id]);


    console.log(riderRequestOrder);
    return (
        <div className='flex flex-col items-center h-screen'>
            <div
            // className='profile-container'
            className='border-[0.2rem] p-[0.5rem] my-[0.5rem] rounded-lg border-slate-600 w-7/12'
            >
                {riderProfile && (
                    <div className='bg-slate-100 p-[0.5rem] rounded-md'>

                        <div>
                            <RiderHomeBurron id={rider_id} />
                        </div>

                        <div 
                        className='bg-red-600 text-center font-bold text-[1.6rem] text-white py-[0.5rem] rounded-md'
                        >
                            <h2>Profile Information</h2>
                        </div>

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
                            <Link to={`/${rider_id}/pocket`}>
                                <button className="button text-[1.2rem] text-medium">
                                    Pocket
                                </button>
                            </Link>
                        </div>

                    </div>
                )}
            </div>

            <div className='border-[0.2rem] p-[0.5rem] my-[0.5rem] rounded-lg border-slate-600 w-7/12'>
                
                <div className='text-center text-[1.2rem] p-[0.5rem] font-bold bg-slate-100 rounded-md'>
                    <h1>Request Order</h1>
                </div>

                <div className='border-2 border-slate-600 rounded-md p-[0.5rem] mt-[0.5rem]'>
                {riderRequestOrder.data.map(order => (
                    <div key={order.Order_ID}>
                        <Link to={`/rider_account/${rider_id}/request_order/${order.Order_ID}`}>
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
    );
}

export default RiderRequestOrder;
