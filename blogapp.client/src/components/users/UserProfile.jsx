import React, { useState, useEffect } from 'react';
import { GetUser, UpdateUser } from '../../services/usersService';
import ImageComponent from '../ImageComponent';
import ModalButton from '../ModalButton';
import UserProfileCreate from './UserProfileCreate';

const UserProfile = () => {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    description: ''
  });

  // Загрузка данных пользователя с помощью useEffect и fetch
  useEffect(() => {
    const fetchUser = async () => {
        const data = await GetUser();
        setUser(data);
    };
    fetchUser();
  }, []);

  const userUpdate = (newUser) => {
    setUser(newUser);
    UpdateUser(newUser);
  }

  // Рендеринг компонента с данными пользователя
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Description: {user.description}</p>
      <ImageComponent byteArray={user.photo} />
      <ModalButton modalContent = {<UserProfileCreate user={user} setAction = {userUpdate}/>} title = 'Edit' />
    </div>
  );
};

export default UserProfile;

