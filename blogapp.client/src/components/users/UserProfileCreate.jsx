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
  const [userPhotoStr, setUserPhotoStr] = useState('');

  const endCreate = () => {
    if(userPassword.lenght === 0) return;

    const newUser = {
      id: user.id,
      name: userName,
      email: userEmail,
      description: userDescription,
      password: userPassword,
      photo: userPhoto
    }
    setAction(newUser);
  }

  const img = userPhotoStr.length > 0 ? <img src = {userPhotoStr} alt='Image'/> : <ImageComponent base64String={user.photo} />;

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
      {img}
      <ImageUploader byteImageAction={(str, bytes) => {setUserPhoto(bytes); setUserPhotoStr(str)}} />
      <button onClick={endCreate}>Ok</button>
    </div>
  );
};

export default UserProfileCreate;

