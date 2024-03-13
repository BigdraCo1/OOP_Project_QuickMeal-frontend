import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serializedFormData = qs.stringify(formData);

      const response = await api.post("/auth/token", serializedFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        // Set cookie with expiration time 30 minutes from now
        const expirationTime = new Date(new Date().getTime() + 30 * 60000);
        Cookies.set("token", response.data.access_token, {
          expires: expirationTime,
        });

        // Decode the JWT token to access the payload
        const tokenParts = response.data.access_token.split(".");
        const payload = JSON.parse(atob(tokenParts[1])); // Decode Base64 URL
        const role = payload.role;
        const id = payload.id
        console.log(role)
        switch (role) {
        case "customer":
          window.location.href = `/${id}/restaurants`;
          break;
         case "rider":
           window.location.href = `/rider_account/${id}`;
           break;
        case "restaurant":
          window.location.href = `/restaurant_account/${id}`;
          break;
         case "admin":
           window.location.href = `/admin/main`;
          break;
          default:
            window.location.href = "/";
       }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
      console.log("Login failed");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-green-500 to-lime-500 min-h-screen'>
      <div className="text-[1.6rem] text-white font-bold w-[300px]">
        <h4>LOGIN</h4>
      </div>
      <form className='border border-gray-300 rounded-md p-6 
      flex flex-col items-center bg-white shadow-md' 
      onSubmit={handleSubmit}>
        <div className='mb-4 w-full'>
          <label htmlFor="username" className='text-gray-700 text-[1.1rem] font-medium'>Username :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
          />
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor="password" className='text-gray-700 text-[1.1rem] font-medium'>Password :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
          />
        </div>
        <div className='justify-start w-full'>
          <button 
            type="submit" 
            className='bg-emerald-600 hover:bg-slate-100 border-[3px] border-emerald-600
            text-white hover:text-emerald-600 font-bold py-[0.4rem] px-[1.2rem] rounded 
            transition-all duration-300 w-full'
          >Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;