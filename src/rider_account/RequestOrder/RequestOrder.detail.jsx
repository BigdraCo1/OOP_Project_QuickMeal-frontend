import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../api/api'

function RequestOrderDetail() {

    const { rider_id, order_id } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);

    async function fetchOrderDetail(order_id) {
        try {
            const order_response = await api.get(`${BASE_URL}/show_order_detail/${order_id}`);
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
                <Link to={`/rider_account/${rider_id}`}>
                    <button
                        onClick={async () => {
                            await fetchAccept(order_id);
                        }}>
                        Accept
                    </button>
                </Link>
            </div>
        </>
    );

}

export default RequestOrderDetail;