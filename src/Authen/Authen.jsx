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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;