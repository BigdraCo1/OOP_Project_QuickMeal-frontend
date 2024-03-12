import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../api/api'

function RecievedOrderDetail() {

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

    async function receive_from_restaurant(order_id) {
        try {
            const receiver_response = await api.put(`${BASE_URL}/rider/rider/${rider_id}/receive/${order_id}`);
            if (receiver_response.data) {
                alert('Receive Success');
                window.location.reload();
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }

    async function delivere_order(order_id) {
        try {
            const receiver_response = await api.put(`${BASE_URL}/rider/${rider_id}/delivere/${order_id}`);
            if (receiver_response.data) {
                alert('Delivere Success');
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }

    async function cancel_order(order_id) {
        try {
            const receiver_response = await api.put(`${BASE_URL}/rider/rider/${rider_id}/deny/${order_id}`);
            if (receiver_response.data) {
                alert('Delivere Success');
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }

    return (
        <>
            <div>
                <h1>Finish order detail</h1>
                {orderDetail && (
                    <div className="OrderDetail">
                        <p>Order ID: {order_id}</p>
                        <p>Customer: {orderDetail.Customer}</p>
                        <p>Rider: {orderDetail.Rider}</p>
                        <p>Restaurant: {orderDetail.Restaurant}</p>
                        <p>Food: {orderDetail.Food.join(', ')}</p>
                        <p>Order State: {orderDetail.Order_State}</p>
                        <p>Payment: {orderDetail.Payment}</p>
                    </div>
                )}
                {orderDetail && orderDetail.Order_State !== 'delivering' && (
                    <button
                        onClick={async () => {
                            await receive_from_restaurant(order_id);
                        }}>
                        Receive Order
                    </button>
                )}
                {orderDetail && orderDetail.Order_State !== 'delivering' && (
                    <Link to={`/rider_account/${rider_id}`}>
                        <button
                            onClick={async () => {
                                await cancel_order(order_id);
                            }}>
                            Cancel Order
                        </button>
                    </Link>
                )}
                {orderDetail && orderDetail.Order_State === 'delivering' && (
                    <Link to={`/rider_account/${rider_id}`}>
                        <button
                            onClick={async () => {
                                await delivere_order(order_id);
                            }}>
                            Delivere Order
                        </button>
                    </Link>
                )}
            </div>
        </>
    );

}

export default RecievedOrderDetail;