import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import CustomerRestaurants from './showres/restaurants.jsx'
import CustomerMenu from './menu/Menu.jsx'
import CustomerReviews from './showreview/review.jsx'
import CustomerFoodDetail from './fooddetail/fooddetail.jsx'
import Basket from './Basket/Basket.jsx'
import ChooseAddress from './chooseaddress/ChooseAddress.jsx'
import CustomerProfile from './Profile/CustomerProfile.jsx'
import LoginForm from './authen/Auth.jsx'
import CustomerCurrentOrder from './currentorder/CurrentOrder.jsx'
import CustomerOrderHistory from './orderhistory/OrderHistory.jsx'

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
    element: <CustomerRestaurants />,
  },{
    path: "/:id/show/:resId/menu",
    element: <CustomerMenu />,
  },{
    path: "/:id/review/show/:resId",
    element: <CustomerReviews />,
  },{
    path: "/:id/show/:foodId/detail",
    element: <CustomerFoodDetail />,
  },{
    path: "/:id/basket",
    element: <Basket />,
  },{
    path: "/:id/basket/choose_address",
    element: <ChooseAddress />,
  },{
    path: "/:id/Profile",
    element: <CustomerProfile />,
  },{
    path: "/:id/current_order",
    element: <CustomerCurrentOrder />,
  },{
    path: "/:id/order_History",
    element: <CustomerOrderHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
