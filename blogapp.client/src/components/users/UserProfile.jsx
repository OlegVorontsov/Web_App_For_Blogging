import React, { useState, useEffect } from 'react';
import { GetUser, exitFromProfile, updateUser } from '../../services/usersService';
import ImageComponent from '../ImageComponent';
import ModalButton from '../ModalButton';
import UserProfileCreate from './UserProfileCreate';
import NewsByUser from '../news/News';

const UserProfile = () => {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState({
    id: 0,
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
    <div style={{textAlign: 'left'}}>
      <h2>User Profile</h2>
      <div style={{display: 'flex'}}>
        <div className='image-box' style={{width: '50%', marginRight: '20px'}}>
          <ImageComponent base64String={user.photo} />
        </div>
        <div className='user-data'>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Description: {user.description}</p>
          <div style={{display: 'flex', gap: '10px'}}>
            <ModalButton
              btnName={'Edit'}
              modalContent = {<UserProfileCreate user={user} setAction = {updateUserView}/>}
              title = 'Edit' />
            <button className="btn btn-secondary" onClick={() => exitFromProfile()}>Sign out</button>
          </div>
        </div>
      </div>
      <NewsByUser userId={user.id} />
    </div>  
  );
};

export default UserProfile;

