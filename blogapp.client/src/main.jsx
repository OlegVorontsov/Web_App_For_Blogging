import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import UserProfile from './components/users/UserProfile'
import {LOGIN_URL, PROFILE_URL, SIGNUP_URL} from './services/commonService'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>
  },
  {
    path: '/about',
    element: <div>About</div>
  },
  {
    path: LOGIN_URL,
    element: <Login />
  },
  {
    path: PROFILE_URL,
    element: <UserProfile />
  },
  {
    path: SIGNUP_URL,
    element: <SignUp />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
