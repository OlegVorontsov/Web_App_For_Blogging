import React, { useState, useEffect } from 'react';
import { GetUser, exitFromProfile, updateUser } from '../../services/usersService';
import ModalButton from '../ModalButton';
import UserProfileCreate from './UserProfileCreate';
import UserView from './UserView';
import { Button } from 'react-bootstrap';

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
  };

  // Рендеринг компонента с данными пользователя
  return (
    <div className='user-profile'>
      <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
        <ModalButton
         variant="outline-primary"
          btnName={'Edit'}
          modalContent = {<UserProfileCreate user={user} setAction = {updateUserView}/>}
          title = 'Edit profile' />
          <Button style={{marginRight: '10px'}}
                  variant="outline-danger"
                  onClick={() => exitFromProfile()}>Sign out</Button>
      </div>
        <UserView user = {user} isProfile = {true} />
    </div>
  );
};

export default UserProfile;

