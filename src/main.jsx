import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Restaurants from './showres/restaurants.jsx'
import Menu from './menu/Menu.jsx'
import Reviews from './showreview/review.jsx'
import FoodDetail from './fooddetail/fooddetail.jsx'
import Basket from './Basket/Basket.jsx'
import ChooseAddress from './chooseaddress/ChooseAddress.jsx'
import CustomerProfile from './Profile/CustomerProfile.jsx'
import LoginForm from './authen/Auth.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },{
    path: "/:id/restaurants",
    element: <Restaurants />,
  },{
    path: "/:id/show/:resId/menu",
    element: <Menu />,
  },{
    path: "/:id/review/show/:resId",
    element: <Reviews />,
  },{
    path: "/:id/show/:foodId/detail",
    element: <FoodDetail />,
  },{
    path: "/:id/basket",
    element: <Basket />,
  },{
    path: "/:id/basket/choose_address",
    element: <ChooseAddress />,
  },{
    path: "/:id/Profile",
    element: <CustomerProfile />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
