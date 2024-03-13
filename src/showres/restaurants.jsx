import React, { useState, useEffect } from "react";
import "./restaurants.css";
import { Link, useParams } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import BasketButton from "../components/BasketButton";
import HomeButton from "../components/HomeButton";
import ProfileButton from "../components/ProfileButton";
import api from "../Header/API";
import lensLogo from "../assets/lens.svg";

const BASE_URL = "http://127.0.0.1:8000";

function CustomerRestaurants() {
  const { id } = useParams();
  const [key, setKey] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRestaurant(key) {
    try {
      let response;
      if (key === "") {
        response = await api.get(`${BASE_URL}/show/restaurant/mainpage`);
      } else {
        response = await api.get(
          `${BASE_URL}/search/menu_and_restaurant/${key}`
        );
      }
      setRestaurants(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmit = () => {
    fetchRestaurant(key);
  };
  useEffect(() => {
    fetchRestaurant(key);
  }, []);

  return (
    <div
    // addictional tailwindcss
    className="bg-gradient-to-b from-green-500 to-lime-500 min-h-screen p-[4rem]"
    >
      {isLoading && <div className="text-center">Loading...</div>}
      {!isLoading && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <HomeButton id={id} />
            <BasketButton id={id} />
            <ProfileButton id={id} />
          </div>
          <div className="fixedPosBar bg-slate-200 px-[1rem] py-[0.5rem] rounded-md shadow-md">
            <div className="flex gap-2 relative sm:rounded-lg">
              <div className="relative mt-0">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <img src={lensLogo} className="logo" alt="Star logo" />
                </div>
                <input
                    className="mt-1 px-3 py-2 border border-gray-300 shadow-sm bg-gray-50 focus:outline-none focus:border-green-200 text-gray-900 text-sm rounded-lg block w-80 pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                    type="text" placeholder="Search for restaurants..." value={key} onChange={handleChange} 
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                />
                </div>
                <button className="h-12 min-w-[8rem] rounded-lg border-[3px] text-[1.1rem] font-medium border-emerald-600 bg-emerald-600 
                text-emerald-50 shadow-lg hover:bg-slate-100 hover:text-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600
                transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-xl"
                  onClick={handleSubmit}>Search
                </button>
            </div>
          </div>
          <div className="overscroll-contain mt-[1rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant, index) => (
              <div key={index}>
                <Link to={`/${id}/show/${restaurant._Restaurant__restaurant_id}/menu`}>
                  <RestaurantCard
                    name={restaurant._Restaurant__name_restaurant}
                    rating={restaurant._Restaurant__rate}
                    location={restaurant._Restaurant__restaurant_location}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerRestaurants;