import React, { useState } from 'react';
import ImageComponent from '../ImageComponent';
import ImageUploader from '../ImageUploader';
import { Button, Form } from "react-bootstrap";

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
    <div style ={{display: 'flex', flexDirection: 'column' }}>
      <p>Name</p>
      <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter name"
                defaultValue={userName}
                onChange={e => setUserName(e.target.value)} />
      <p>Email</p>
      <Form.Control
                className="mb-2"
                type="email"
                placeholder="Enter email"
                defaultValue={userEmail}
                onChange={e => setUserEmail(e.target.value)} />
      <p>Password</p>
      <Form.Control
                className="mb-2"
                type="password"
                placeholder="Enter email"
                defaultValue={userPassword}
                onChange={e => setUserPassword(e.target.value)} />
      <p>Description</p>
      <Form.Control as="textarea" rows={3}
                className="mb-2"
                placeholder="Enter description"
                defaultValue={userDescription}
                onChange={e => setUserDescription(e.target.value)} />
      <div style ={{ maxWidth: '100%' }}>
        {img}
      </div>
      <ImageUploader byteImageAction={(str, bytes) => {setUserPhoto(bytes); setUserPhotoStr(str)}} />
      <Button variant="outline-primary" className="mr-2" onClick={endCreate}>Ok</Button>
    </div>
  );
};

export default UserProfileCreate;

