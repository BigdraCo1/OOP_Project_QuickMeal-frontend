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
    <>
      <div>
        <div className="profile-container">

          <div>
            <div className="flex justify-between items-center">
              <ResAccHomeButton id={account_id} />
              <ResAccProfileButton id={account_id} />
            </div>
            <div>
              <h1>Welcome to Restaurant owner page!!</h1>
              <Link to={`/restaurant_account/${account_id}/add`}>
                <button className="button">Add Restaurant</button>
              </Link>
            </div>
          </div>

        </div>
        <div className="button-container">
          {restaurants.length > 0 && (
            <div>
              <h2>Restaurants Information</h2>
              {restaurants.map((restaurant, index) => (
                <div className="restaurant-contain" key={index}>
                  <Link to={`/${restaurant.Restaurant_Name}`}>
                    <button>
                      <h3>Name: {restaurant.Restaurant_Name}</h3>
                      <p>Location: {restaurant.Restaurant_Location}</p>
                      <p>Rate: {restaurant.Rate}</p>
                    </button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={async () => {
                      await deleteRestaurant(restaurant.Restaurant_Name);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RestaurantAccount;
