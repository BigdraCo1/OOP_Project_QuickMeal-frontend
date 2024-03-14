import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/api';
import ResHomeButton from '../RestaurantComponent/ResHomeButton';

const BASE_URL = 'http://127.0.0.1:8000';

function RestaurantFinishedOrder() {
    const { restaurant_name } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null); // กำหนดค่าเริ่มต้นเป็น null
    const [finishedOrderList, setFinishedOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    async function fetchRestaurant(restaurant_name) {
        try {
            setIsLoading(true)
            const restaurant_response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_name/${restaurant_name}`);
            if (restaurant_response.data) {
                setRestaurantDetail(restaurant_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    async function fetchFinishedOrderList(restaurantDetail) {
        try {
            const finished_order_response = await api.get(`${BASE_URL}/restaurant/show_finished_order_list_in_restaurant/${restaurantDetail.Restaurant_ID}`);
            if (finished_order_response.data) {
                setFinishedOrderList(finished_order_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    
    useEffect(() => {
        fetchRestaurant(restaurant_name);
    }, [restaurant_name]);
    
    useEffect(() => {
        if (restaurantDetail) {
            fetchFinishedOrderList(restaurantDetail);
        }
    }, [restaurantDetail]);

    return (
        <div className='bg-gradient-to-b from-green-500 to-blue-500 min-h-screen'>
        <div  className='flex flex-col items-center h-screen'>
            <div className='border-[0.2rem] p-[0.5rem] my-[0.5rem] rounded-lg border-slate-600 w-7/12'>
            <div 
            // className="flex justify-between items-center"
            >
                <ResHomeButton name={restaurant_name} />
            </div>
            <div 
            // className='restaurant-container'
            className='p-[2rem] rounded-md bg-white flex flex-col justify-center w-full'
            >
                {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                    <div className='font-bold text-[1.2rem] grid grid-cols-2'>
                        <p className='text-right pr-[0.5rem]'>Restaurant Name :</p>
                        <p className='text-left'> {restaurantDetail.Restaurant_Name}</p>
                        <p className='text-right pr-[0.5rem]'>Location :</p>
                        <p className='text-left'>{restaurantDetail.Restaurant_Location}</p>
                        <p className='text-right pr-[0.5rem]'>Rate :</p>
                        <p className='text-left'>{restaurantDetail.Rate}</p>
                    </div>
                )}
            </div>
            <div>
                <h2 className='text-[1.2rem] font-bold rounded-md w-full border-2 border-blue-300
                     bg-slate-100 my-[0.5rem] px-[0.5rem] py-[0.5rem]'>Finished Orders:</h2>
                <div className='border-[0.2rem] rounded-md p-[0.5rem]'>
                {finishedOrderList[restaurant_name] && finishedOrderList[restaurant_name].map(order => (
                    <Link to={`/${restaurant_name}/finished_order/${order.Order_ID}`} 
                    key={order.Order_ID}>
                    <button 
                    // className='order-button' 
                    className='font-medium text-[1.1rem] my-[0.3rem] w-full bg-slate-100 py-[1.2rem] rounded-md'
                    key={order.Order_ID}>
                        <p>Order ID: {order.Order_ID}</p>
                        <p>Order State: {order.Order_State}</p>
                    </button>
                    </Link>
                ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default RestaurantFinishedOrder;