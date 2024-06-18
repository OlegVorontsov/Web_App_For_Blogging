import React, { useState, useEffect } from 'react';
import { GetUser, exitFromProfile, updateUser } from '../../services/usersService';
import ImageComponent from '../ImageComponent';
import ModalButton from '../ModalButton';
import UserProfileCreate from './UserProfileCreate';

const UserProfile = () => {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    description: '',
    password: '',
    photo: ''
  });

  // Загрузка данных пользователя с помощью useEffect и fetch
  useEffect(() => {
    const fetchUser = async () => {
        const data = await GetUser();
        setUser(data);
    };
    fetchUser();
  }, []);

  const updateUserView = (newUser) => {
    setUser(newUser);
    updateUser(newUser);
  }

  // Рендеринг компонента с данными пользователя
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Description: {user.description}</p>
      <ImageComponent base64String={user.photo} />
      <ModalButton modalContent = {<UserProfileCreate user={user} setAction = {updateUserView}/>} title = 'Edit' />
      <button className="btn btn-secondary" onClick={() => exitFromProfile()}>Sign out</button>
    </div>
  );
};

export default UserProfile;

