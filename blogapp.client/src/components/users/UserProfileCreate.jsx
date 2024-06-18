import React, { useState } from 'react';
import ImageComponent from '../ImageComponent';
import ImageUploader from '../ImageUploader';

const UserProfileCreate = ({user, setAction}) => {
  // Состояние для хранения данных пользователя
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState();
  const [userDescription, setUserDescription] = useState(user.description);
  const [userPhoto, setUserPhoto] = useState(user.photo);

  const endCreate = () => {
    if(userPassword.lenght === 0) return;
    
    const newUser = {
      name: userName,
      email: userEmail,
      password: userPassword,
      photo: userPhoto,
      description: userDescription
    }
    setAction(newUser);
  }

  // Рендеринг компонента с данными пользователя
  return (
    <div style ={{display: 'flex', flexDirection: 'column'}}>
      <h2>User Profile</h2>
      <p>Name</p>
      <input type='text' defaultValue={userName} onChange={e => setUserName(e.target.value)} />
      <p>Email</p>
      <input type='email' defaultValue={userEmail} onChange={e => setUserEmail(e.target.value)} />
      <p>Password</p>
      <input type='password' defaultValue={userPassword} onChange={e => setUserPassword(e.target.value)} />
      <p>Description</p>
      <textarea type='text' defaultValue={userDescription} onChange={e => setUserDescription(e.target.value)} />
      <ImageUploader byteImageAction={(bytes) => setUserPhoto(bytes)} />
      <ImageComponent byteArray={user.photo} />
      <button onClick={endCreate}>Ok</button>
    </div>
  );
};

export default UserProfileCreate;

