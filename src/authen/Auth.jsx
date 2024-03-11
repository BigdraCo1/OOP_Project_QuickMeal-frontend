import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

const LoginForm = () => {
  
    const [formData, setFormData] = useState({
    username: '',
    password: '',
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

      const response = await api.post('/auth/token',serializedFormData, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
      });

      if (response.status === 200) {
        // Set cookie with expiration time 30 minutes from now
        const expirationTime = new Date(new Date().getTime() + 30 * 60000);
        Cookies.set('token', response.data.access_token, { expires: expirationTime });
        console.log('Login successful');
        // Redirect or do something else upon successful login
      } else {
        console.log('Login failed');
        // Display error message or handle failed login
      }
    } catch (error) {
      console.error(error);
      console.log('Login failed');
      // Display error message or handle failed login
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-emerald-600'>
      <form className='border border-gray-300 rounded-md p-6 
      flex flex-col items-center bg-white shadow-md' 
      onSubmit={handleSubmit}>
        <div className='mb-4 w-full'>
          <label htmlFor="username" className='text-gray-700'>Username :</label>
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
          <label htmlFor="password" className='text-gray-700'>Password :</label>
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
            transition-all duration-300'
          >Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
