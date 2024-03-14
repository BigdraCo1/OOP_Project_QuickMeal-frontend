import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Main.css";
import api from "../api/api";
import ResAccHomeButton from "./RestaurantAccComponents/ResAccHomeButton";
import ResAccProfileButton from "./RestaurantAccComponents/ResAccProfileButton";

const BASE_URL = "http://127.0.0.1:8000";

function RestaurantAccount() {
  const { account_id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      setIsLoading(true);
      const restaurant_response = await api.get(
        `${BASE_URL}/restaurant/account/${account_id}`
      );
      if (restaurant_response.data[account_id]) {
        setRestaurants(restaurant_response.data[account_id]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRestaurant(restaurant_name) {
    try {
      setIsLoading(true);
      await api.delete(`${BASE_URL}/restaurant/delete/${restaurant_name}`);
      await fetchData();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [account_id]);

  return (
    <div className="bg-gradient-to-b from-green-500 to-blue-500 min-h-screen
    flex justify-center h-screen">
      <div className="flex flex-col justify-start px-[1rem] bg-slate-200 h-screen w-8/12">
        <div className="profile-container
        text-center justify-start items-start text-slate-800 bg-slate-400 py-[1rem] my-[0rem] rounded-md">
          <div>
            <div className="flex justify-between items-center">
              <ResAccHomeButton id={account_id} />
              <ResAccProfileButton id={account_id} />
            </div>
            <div>
              <h1 className="font-medium text-[1.2rem] mb-[0.5rem]">Welcome to Restaurant owner page!!</h1>
              <Link to={`/restaurant_account/${account_id}/add`}>
                <button className="button">Add Restaurant</button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {restaurants.length > 0 && (
            <div>
              <h2 className="text-slate-100 font-medium text-[1.6rem] bg-slate-600 rounded-md 
              my-[0.5rem] px-[0.6rem] py-[0.3rem]">
                Restaurants Information
              </h2>
              {restaurants.map((restaurant, index) => (
                <div className="border-2 border-green-600 rounded-lg px-[0.5rem] my-[0.5rem] py-[0.5rem] bg-emerald-600" key={index}>
                  <div className="py-2">
                    <Link to={`/${restaurant.Restaurant_Name}`}>
                      <button className="font-medium text-[1.2rem] w-full grid grid-cols-2
                      rounded-md bg-slate-200 py-[0.5rem]">
                        <div className="text-right pr-[0.5rem]">Name :</div>
                        <div className="text-left">{restaurant.Restaurant_Name}</div>
                        <div className="text-right pr-[0.5rem]">Location :</div>
                        <div className="text-left">{restaurant.Restaurant_Location}</div>
                        <div className="text-right pr-[0.5rem]">Rate :</div>
                        <div className="text-left">{restaurant.Rate}</div>
                      </button>
                    </Link>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="h-12 w-full px-4 font-medium text-[1.2rem] 
                      text-white bg-rose-600 rounded-md mb-[0.5rem]"
                      onClick={async () => {
                        await deleteRestaurant(restaurant.Restaurant_Name);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantAccount;
