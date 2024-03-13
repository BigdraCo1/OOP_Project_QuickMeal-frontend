import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ResHomeButton from '../RestaurantComponent/ResHomeButton';
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../../api/api';

function RestaurantFinishedOrderDetail() {
    const { restaurant_name, order_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);

    async function fetchRestaurant(restaurant_name) {
        try {
            const restaurant_response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_name/${restaurant_name}`);
            if (restaurant_response.data) {
                setRestaurantDetail(restaurant_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async function fetchOrderDetail(order_id) {
        try {
            const order_response = await api.get(`${BASE_URL}/show/order/detail/${order_id}`);
            setOrderDetail(order_response.data);
        } catch (error) {
            console.log('error', error);
        }
    }


    useEffect(() => {
        fetchRestaurant(restaurant_name);
    }, [restaurant_name]);

    useEffect(() => {
        fetchOrderDetail(order_id);
    }, [order_id]);

    return (
        <>
            <div>
                <h1>RequestedOrderDetail</h1>
                {orderDetail && (
                    <div className="OrderDetail">
                        <div className="flex justify-between items-center">
                            <ResHomeButton name={restaurant_name} />
                        </div>
                        <p>Order ID: {order_id}</p>
                        <p>Customer: {orderDetail.Customer}</p>
                        <p>Rider: {orderDetail.Rider}</p>
                        <p>Restaurant: {orderDetail.Restaurant}</p>
                        <p>Food: {orderDetail.Food.map(food => <><br />{food}</>)}</p>
                        <p>Order State: {orderDetail.Order_State}</p>
                        <p>Payment: {orderDetail.Payment}</p>
                    </div>
                )}
            </div>
        </>
    );

}

export default RestaurantFinishedOrderDetail;