import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../api/api'
import RiderHomeButton from '../RiderComponent/RiderHomeButton';

import RiderHomeBurron from '../RiderComponent/RiderHomeBurron.jsx';

function RequestOrderDetail() {

    const { rider_id, order_id } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);

    async function fetchOrderDetail(order_id) {
        try {
            const order_response = await api.get(`${BASE_URL}/show/order/detail/${order_id}`);
            setOrderDetail(order_response.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchOrderDetail(order_id);
    }, [order_id]);

    async function fetchAccept(order_id) {
        try {
            const accept_response = await api.put(`${BASE_URL}/rider/rider/${rider_id}/accept/${order_id}`);
            if (accept_response.data) {
                alert('Accept Success');
            }

        }
        catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div>
            <div className='h-screen flex flex-col justify-start items-center p-[1rem]'>
                <div className='w-6/12'>
                    <div>
                        <RiderHomeButton id={rider_id} />
                    </div>
                    <h1 
                    className='bg-slate-300 w-full p-[0.5rem] text-center rounded-md font-bold text-[1.6rem]'
                    >
                        Order detail
                    </h1>
                    <div className='border-2 bg-slate-100 font-medium mt-[0.5rem] '>
                        {orderDetail && (
                            <div className='grid grid-cols-2'>
                                <p className='text-right pr-[0.5rem]'>Order ID :</p>
                                <p className='text-left'>{order_id}</p>
                                <p className='text-right pr-[0.5rem]'>Customer :</p>
                                <p className='text-left'>{orderDetail.Customer}</p>
                                <p className='text-right pr-[0.5rem]'>Rider :</p>
                                <p className='text-left'>{orderDetail.Rider}</p>
                                <p className='text-right pr-[0.5rem]'>Restaurant :</p>
                                <p className='text-left'>{orderDetail.Restaurant}</p>
                                <p className='text-right pr-[0.5rem]'>Food :</p>
                                <p className='text-left'>{orderDetail.Food.join(', ')}</p>
                                <p className='text-right pr-[0.5rem]'>Order State :</p>
                                <p className='text-left'>{orderDetail.Order_State}</p>
                                <p className='text-right pr-[0.5rem]'>Payment :</p>
                                <p className='text-left'>{orderDetail.Payment}</p>
                            </div>
                        )}
                    </div>
                    <Link to={`/rider_account/${rider_id}`}>
                        <button
                        className='bg-red-500 w-full text-[1.2rem] font-medium text-white rounded-md mt-[0.5rem]'
                            onClick={async () => {
                                await fetchAccept(order_id);
                            }}>
                            Accept
                        </button>
                    </Link>`
                </div>
            </div>
        </div>
    );

}

export default RequestOrderDetail;