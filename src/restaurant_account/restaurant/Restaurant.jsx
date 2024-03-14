import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Restaurant.css';
import api from '../../api/api';
import ResAccountHomeButton from './RestaurantComponent/ResAccountButton';

const BASE_URL = 'http://127.0.0.1:8000';

function Restaurant() {
    const { restaurant_name } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [restaurantOwner, setRestaurantOwner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRestaurant(restaurant_name) {
        try {
            const response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_name/${restaurant_name}`);
            setRestaurantDetail(response.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    async function fetchRestaurantOwner(restaurant_name) {
        try{
            const response = await api.get(`${BASE_URL}/restaurant/get_restaurant_owner_id_by_restaurant_name/${restaurant_name}`);
            setRestaurantOwner(response.data);
        } catch (error) {
            console.log('error', error);
        }
        
    }
    useEffect(() => {
        setIsLoading(true);
        fetchRestaurant(restaurant_name);
        fetchRestaurantOwner(restaurant_name);
        setIsLoading(false);
    }, [restaurant_name]);
    
    console.log(restaurantOwner);
    return (
        <div className='bg-gradient-to-b from-green-500 to-blue-500 min-h-screen'>
        <div className='flex justify-center'>
            {isLoading && (<p className="border border-gray-200 p-[0.5rem] rounded-md bg-white flex flex-col justify-center items-center text-[1.6rem] font-bold mb-1">Loading..</p>)}
            {!isLoading && restaurantOwner &&
                <div className='flex flex-col items-center w-7/12'>
                    <div className="flex justify-between items-center">
                        <ResAccountHomeButton id={restaurantOwner.restaurant_owner}/>
                    </div>
                    <div 
                    // className='restaurant-container'
                    className='w-9/12 p-[2rem] rounded-md bg-white flex flex-col justify-center 
                    items-center text-[1.4rem] font-bold my-[1rem]'>
                        <h2 className='text-white bg-red-600 w-full text-center py-[0.5rem] rounded-md'>Restaurant Information</h2>
                        {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                            <div className='grid grid-cols-2'>
                                <p className='text-right pr-[0.5rem]'>Restaurant Name :</p>
                                <p className='text-left'>{restaurantDetail.Restaurant_Name}</p>
                                <p className='text-right pr-[0.5rem]'>Location :</p>
                                <p className='text-left'>{restaurantDetail.Restaurant_Location}</p>
                                <p className='text-right pr-[0.5rem]'>Rate :</p>
                                <p className='text-left'>{restaurantDetail.Rate}</p>
                            </div>
                        )}
                    </div>
                    <div 
                    // className='button-container'
                    className='flex flex-col w-9/12'
                    >
                        <div className='rounded-md text-center text-[1.2rem] font-bold bg-white py-[1rem]'>
                        <Link to={`/${restaurant_name}/request_order`}>
                            <button>
                                Request Order
                            </button>
                        </Link>
                        </div>
                        <br />
                        <div className='rounded-md text-center text-[1.2rem] font-bold bg-white py-[1rem]'>
                        <Link to={`/${restaurant_name}/requested_order`}>
                            <button>
                                Requested Order
                            </button>
                        </Link>
                        </div>
                        <br />
                        <div className='rounded-md text-center text-[1.2rem] font-bold bg-white py-[1rem]'>
                        <Link to={`/${restaurant_name}/menu`}>
                            <button>
                                Menu
                            </button>
                        </Link>
                        </div>
                        <br />
                        <div className='rounded-md text-center text-[1.2rem] font-bold bg-white py-[1rem]'>
                        <Link to={`/${restaurant_name}/finished_order`}>
                            <button>
                                History
                            </button>
                        </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
        </div>
    );
}

export default Restaurant;
