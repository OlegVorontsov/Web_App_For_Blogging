import { useState } from 'react';
import ImageComponent from '../ImageComponent';
import ImageUploader from '../ImageUploader';

const NewsCreate = ({id, oldText, oldImg, setAction}) => {
    const[text, setText] = useState(oldText);
    const[img, setImg] = useState(oldImg);
    const[imgStr, setImgStr] = useState('');

    const endCreate = () => {
        const newNews = {
            id: id,
            text: text,
            img: img
        };

        setAction(newNews);
    }

    const imgView = img.length > 0 ?
        <img src = {imgStr} alt='Image'/> : <ImageComponent base64String={oldImg} />;

    return(
        <div style ={{display: 'flex', flexDirection: 'column'}}>
            <textarea defaultValue={text} onChange={e => setText(e.target.value)} />
            {imgView}
            <ImageUploader byteImageAction={(str, bytes) => {setImg(bytes); setImgStr(str)}} />
            <button onClick={endCreate}>Ok</button>
        </div>
    )
}
export default NewsCreate;