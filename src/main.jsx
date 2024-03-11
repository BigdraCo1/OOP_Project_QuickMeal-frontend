import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './customer/App.jsx'
import Menu from './restaurant_account/restaurant/Menu.jsx'
import Register from './Register/Register.jsx'
import Auth from './authen/Auth.jsx'
import ApproveRider from './admin/ApproveRider.jsx'
import ApproveRestaurant from './admin/ApproveRestaurant.jsx'
import AdminPanel from './admin/AdminMain.jsx'
import EditMenu from './restaurant_account/restaurant/EditMenu.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import AddMenu from './restaurant_account/restaurant/AddMenu.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:restaurant",
    element: <Menu />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/admin/approve/rider",
    element: <ApproveRider />,
  },
  {
    path: "/admin/approve/restaurant",
    element: <ApproveRestaurant />,
  },
  {
    path: "/admin/main",
    element: <AdminPanel />,
  },
  {
    path: "/:restaurant/:menu",
    element: <EditMenu />,
  },
  {
    path: "/:restaurant/add",
    element: <AddMenu />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
