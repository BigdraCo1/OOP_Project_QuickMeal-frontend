import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';

const BASE_URL = 'http://127.0.0.1:8000';

function RiderReceivedOrder() {
    const { rider_id } = useParams();
    const [riderProfile, setRiderProfile] = useState(null);
    const [riderRecieveOrder, setRiderRecieveOrder] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);


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
    async function fetchRiderRecievedOrder(rider_id) {
        try {
            setIsLoading(true);
            const requested_order_response = await api.get(`${BASE_URL}/rider/${rider_id}/show/requested_order_list`);
            if (requested_order_response.data) {
                setRiderRecieveOrder(requested_order_response.data);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        setIsLoading(true);
        fetchRiderProfile(rider_id);
        fetchRiderRecievedOrder(rider_id);
        setIsLoading(false)

    }, [rider_id]);
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
                <h1>Received Order</h1>
            </div>
            {riderRecieveOrder.data.map(order => (
                    <div key={order.Order_ID}>
                        <button className='order-button' key={order.Order_ID}>
                            <p>Order ID: {order.Order_ID}</p>
                            <p>Customer: {order.Customer}</p>
                            <p>Rider: {order.Rider}</p>
                            <p>Restaurant: {order.Restaurant}</p>
                            <p>Food: {order.Food.join(', ')}</p>
                            <p>Order State: {order.Order_State}</p>
                            <p>Payment: {order.Payment}</p>
                        </button>
                    </div>
                ))}
        </>
    )
}

export default RiderReceivedOrder;