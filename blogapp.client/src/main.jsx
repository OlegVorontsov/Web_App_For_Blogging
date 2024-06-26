import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationMenu from './NavigationMenu';
import UserProfile from './components/users/UserProfile';
import Login from './components/users/Login';
import SignUp from './components/users/SignUp';
import UserPublicView from './components/users/UserPublicView';
import SearchUser from './components/users/SearchUser';
import NewsCreate from './components/news/NewsCreate';
import { ALLNEWS_URL, ALLUSERS_URL, HOME_URL, LOGIN_URL, NEWS_URL, PROFILE_URL, SIGNUP_URL } from './services/commonService';
import Home from './components/Home';
import { NewsForUser } from './components/news/News';

const routes = [
  { path: '', element: <Home /> },
  { path: HOME_URL, element: <Home /> },
  { path: LOGIN_URL, element: <Login /> },
  { path: PROFILE_URL, element: <UserProfile /> },
  { path: SIGNUP_URL, element: <SignUp /> },
  { path: ALLUSERS_URL, element: <SearchUser /> },
  { path: '/:userId', element: <UserPublicView /> },
  { path: ALLNEWS_URL, element: <NewsForUser /> },
  { path: NEWS_URL, element: <NewsCreate /> }
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
