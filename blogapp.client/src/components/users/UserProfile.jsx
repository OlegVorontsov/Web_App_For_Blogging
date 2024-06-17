import React, { useState, useEffect } from 'react';
import { GetUser } from '../../services/usersService';
import ImageComponent from '../ImageComponent';

const UserProfile = () => {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState({
    name: '',
    email: '',
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

  // Рендеринг компонента с данными пользователя
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Description: {user.description}</p>
      <ImageComponent byteArray={user.photo} />
    </div>
  );
};

export default UserProfile;

