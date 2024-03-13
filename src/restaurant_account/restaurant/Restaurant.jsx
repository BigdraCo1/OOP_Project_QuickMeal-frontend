import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Restaurant.css';
import ResAccHomeButton from '../RestaurantAccComponents/ResAccHomeButton';
import api from '../../api/api';

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
    
    return (
        <>
            {isLoading && (<p className="border border-gray-200 p-10 rounded-md bg-white flex flex-col justify-center items-centertext-2xl font-bold mb-1">Loading..</p>)}
            {!isLoading && restaurantOwner &&
                <div>
                    <div className="flex justify-between items-center">
                        <ResAccHomeButton id={restaurantOwner.restaurant_owner} />
                    </div>  
                    <div className='restaurant-container'>
                        <h2>Restaurant Information</h2>
                        {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                            <>
                                <p>Restaurant Name: {restaurantDetail.Restaurant_Name}</p>
                                <p>Location: {restaurantDetail.Restaurant_Location}</p>
                                <p>Rate: {restaurantDetail.Rate}</p>
                            </>
                        )}
                    </div>
                    <div className='button-container'>
                        <Link to={`/${restaurant_name}/request_order`}>
                            <button>
                                Request Order
                            </button>
                        </Link>
                        <br />
                        <Link to={`/${restaurant_name}/requested_order`}>
                            <button>
                                Requested Order
                            </button>
                        </Link>
                        <br />
                        <Link to={`/${restaurant_name}/menu`}>
                            <button>
                                Menu
                            </button>
                        </Link>
                        <br />
                        <Link to={`/${restaurant_name}/finished_order`}>
                            <button>
                                History
                            </button>
                        </Link>
                    </div>
                </div>
            }
        </>
    );
}

export default Restaurant;
