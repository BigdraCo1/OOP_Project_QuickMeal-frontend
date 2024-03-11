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

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/restaurants",
    element: <Restaurants />,
  },{
    path: "/show/:id/menu",
    element: <Menu />,
  },{
    path: "/review/show/:id",
    element: <Reviews />,
  },{
    path: "/show/:id/detail",
    element: <FoodDetail />,
  },{
    path: "/basket/:id",
    element: <Basket />,
  },{
    path: "/basket/choose_address/:id",
    element: <ChooseAddress />,
  },{
    path: "/Profile/:id",
    element: <CustomerProfile />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
