import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../api/api'

import RiderHomeBurron from '../RiderComponent/RiderHomeBurron.jsx';

function FinishedOrderDetail() {

    const { rider_id } = useParams();
    const { order_id } = useParams();
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

    return (
        <div>
            <div className='h-screen flex flex-col justify-start items-center'>
                <div className='p-[1rem] w-6/12'>
                    <div className='rounded-md font-medium text-[1.2rem] bg-slate-300 px-[0.2rem] my-[0.5rem]'>
                        <h1>FinishedOrderDetail</h1>
                    </div>
                    <div>
                        <RiderHomeBurron id={rider_id} />
                    </div>

                    {orderDetail && (
                        <div 
                        // className="OrderDetail"
                        className='p-[1rem] font-medium rounded-md bg-white flex flex-col justify-center w-full'
                        >
                            {/* <div className="flex justify-between items-center">
                                <ResHomeButton name={restaurant_name} />
                            </div> */}
                            <p>Order ID: {order_id}</p>
                            <p>Customer: {orderDetail.Customer}</p>
                            <p>Rider: {orderDetail.Rider}</p>
                            <p>Restaurant: {orderDetail.Restaurant}</p>
                            <p>Food: {orderDetail.Food.join(', ')}</p>
                            <p>Order State: {orderDetail.Order_State}</p>
                            <p>Payment: {orderDetail.Payment}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default FinishedOrderDetail;