import React from 'react';

const ImageComponent = ({ base64String }) => {
  if(base64String === null) return <img className='no-img'/>;

  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  return <img src = {imageUrl} alt='Image'/>
};

export default ImageComponent;