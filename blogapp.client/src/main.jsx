{/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/users/Login';
import SignUp from './components/users/SignUp';
import UserProfile from './components/users/UserProfile';
import {LOGIN_URL, NEWS_URL, PROFILE_URL, SIGNUP_URL, USERS_URL} from './services/commonService';
import UserPublicView from './components/users/UserPublicView';
import SearchUser from './components/users/SearchUser';
import NewsCreate from './components/news/NewsCreate';

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
  },
  {
    path: '/:userId',
    element: <UserPublicView />
  },
  {
    path: '/all',
    element: <SearchUser />
  },
  {
    path: NEWS_URL,
    element: <NewsCreate />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)*/}

// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationMenu from './NavigationMenu';

import Login from './components/users/Login';
import { PROFILE_URL } from './services/commonService';
import UserProfile from './components/users/UserProfile';

const routes = [
  { path: '/login', element: <Login /> },
  { path: PROFILE_URL, element: <UserProfile /> },
];

const App = () => {
  return (
    <Router>
      <div>
        <NavigationMenu />
        <div className="container mt-4"> 
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
