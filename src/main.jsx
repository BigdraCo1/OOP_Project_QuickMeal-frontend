import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './customer/App.jsx'
import Menu from './restaurant_account/restaurant/Menu.jsx'
import Register from './Register/Register.jsx'
import Auth from './authen/Auth.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
