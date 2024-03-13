import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

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
        <>
            <div className='profile-container'>
                {riderProfile && (
                    <>
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
                    </>
                )}
            </div>
            <h1>Request Order</h1>
            {riderRequestOrder.data.map(order => (
                <div key={order.Order_ID}>
                    <Link to={`/rider_account/${rider_id}/request_order/${order.Order_ID}`}>
                        <button className='order-button' key={order.Order_ID}>
                            <p>Order ID: {order.Order_ID}</p>
                            <p>Order State: {order.Order_State}</p>
                        </button>
                    </Link>
                </div>
            ))}
        </>
    );
}

export default RiderRequestOrder;
