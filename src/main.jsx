import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './customer/App.jsx'
import RestaurantAccount from './restaurant_account/Main.jsx'
import Pocket from './general/Pocket.jsx'
import Restaurant from './restaurant_account/restaurant/Restaurant.jsx'
import Menu from './restaurant_account/restaurant/Menu/Menu.jsx'
import RestaurantRequestOrder from './restaurant_account/restaurant/RequestOrder/RequestOrder.jsx'
import RestaurantRequestedOrder from './restaurant_account/restaurant/RequestedOrder/RequestedOrder.jsx'
import RestaurantFinishedOrder from './restaurant_account/restaurant/FinishedOrder/FinishedOrder.jsx'
import RestaurantRequestOrderDetail from './restaurant_account/restaurant/RequestOrder/RequestOrderDetail.jsx'
import RestaurantRequestedOrderDetail from './restaurant_account/restaurant/RequestedOrder/RequestedOrderDetail.jsx'
import RestaurantFinishedOrderDetail from './restaurant_account/restaurant/FinishedOrder/FinishedOrderDetail.jsx'
import LoginForm from './Authen/Authen.jsx'
import RiderAccount from './rider_account/RiderAccount.jsx'
import RiderRequestOrder from './rider_account/RequestOrder/RequestOrder.jsx'
import RiderReceivedOrder from './rider_account/ReceivedOrder/ReceivedOrder.jsx'
import RiderFinishedOrder from './rider_account/FinishedOrder/FinishedOrder.jsx'
import RiderRequestOrderDetail from './rider_account/RequestOrder/RequestOrder.detail.jsx'
import RiderReceivedOrderDetail from './rider_account/ReceivedOrder/ReceivedOrderDetail.jsx'
import RiderFinishedOrderDetail from './rider_account/FinishedOrder/FinishedOrderDetail.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/restaurant_account/:account_id",
    element: <RestaurantAccount />,
  },
  {
    path : "/:account_id/pocket",
    element: <Pocket />,
  },
  {
    path: "/:restaurant_name",
    element: <Restaurant />,
  },
  {
    path: "/:restaurant_name/menu",
    element: <Menu />,
  },
  {
    path: "/:restaurant_name/request_order",
    element: <RestaurantRequestOrder />,
  },
  {
    path: "/:restaurant_name/requested_order",
    element: <RestaurantRequestedOrder />,
  },
  {
    path: "/:restaurant_name/finished_order",
    element: <RestaurantFinishedOrder />,
  },
  {
    path: "/:restaurant_name/request_order/:order_id",
    element: <RestaurantRequestOrderDetail />,
  },
  {
    path: "/:restaurant_name/requested_order/:order_id",
    element: <RestaurantRequestedOrderDetail />,
  },
  {
    path: "/:restaurant_name/finished_order/:order_id",
    element: <RestaurantFinishedOrderDetail />,
  },
  {
    path: "/rider_account/:rider_id",
    element: <RiderAccount />,
  },
  {
    path: "/rider_account/:rider_id/request_order",
    element: <RiderRequestOrder />,
  },
  {
    path: "/rider_account/:rider_id/recieved_order",
    element: <RiderReceivedOrder />,
  },
  {
    path: "/rider_account/:rider_id/finished_order",
    element: <RiderFinishedOrder />,
  },
  {
    path: "/rider_account/:rider_id/request_order/:order_id",
    element: <RiderRequestOrderDetail />,
  },
  {
    path: "/rider_account/:rider_id/recieved_order/:order_id",
    element: <RiderReceivedOrderDetail />,
  },
  {
    path: "/rider_account/:rider_id/finished_order/:order_id",
    element: <RiderFinishedOrderDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
