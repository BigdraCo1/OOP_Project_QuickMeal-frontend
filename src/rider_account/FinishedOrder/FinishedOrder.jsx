import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

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
        <>
            <div className='profile-container'>
                {riderProfile && (
                    <div>
                        <h2>Profile Information</h2>
                        <p>Username: {riderProfile.Username}</p>
                        <p>Fullname: {riderProfile.Fullname}</p>
                        <p>Email: {riderProfile.Email}</p>
                        <p>Phone: {riderProfile.Phone}</p>
                        <Link to={`/${rider_id}/pocket`}>
                            <button className="button">
                                Pocket
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <div>
                <h1>Finished Order</h1>
            </div>
            {riderFinishedOrder.data.map(order => (
                <div key={order.Order_ID}>
                    <Link to={`/rider_account/${rider_id}/finished_order/${order.Order_ID}`}>
                        <button className='order-button' key={order.Order_ID}>
                            <p>Order ID: {order_id}</p>
                            <p>Order State: {orderDetail.Order_State}</p>
                        </button>
                    </Link>
                </div>
            ))}
        </>

    )
}

export default RiderFinishedOrder;