import React, { useState } from 'react';

const ImageUploader = ({byteImageAction}) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const byteArray = new Uint8Array(e.target.result);
        byteImageAction(byteArray);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>Загрузка изображения</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploader;