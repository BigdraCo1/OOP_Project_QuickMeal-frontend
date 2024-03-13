import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ResAccHomeButton from "./RestaurantAccComponents/ResAccHomeButton";
import api from "../api/api";

const BASE_URL = "http://127.0.0.1:8000";

function AddRestaurant() {
  const { id } = useParams();
  const [nameRestaurant, setNameRestaurant] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const newRestaurantData = {
        name_restaurant: nameRestaurant,
        restaurant_location: location,
        food: [],
      };
      console.log(newRestaurantData);
      await api.post(`${BASE_URL}/restaurant/`, newRestaurantData);
    } catch (error) {
      console.log("Error updating menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="padding">
            <div className="flex justify-between items-center">
              <ResAccHomeButton id={id} />
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                id="name"
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                name="name"
                value={nameRestaurant}
                onChange={(e) => setNameRestaurant(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location:</label>
              <input
                id="location"
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Link to={`/restaurant_account/${id}`}>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                Add
              </button>
              <button className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                Back
              </button>
            </Link>
          </div>
        </>
      )}
    </div>


  );
}

export default AddRestaurant;