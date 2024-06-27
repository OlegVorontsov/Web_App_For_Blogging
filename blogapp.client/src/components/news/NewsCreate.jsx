import { useState } from 'react';
import ImageComponent from '../ImageComponent';
import ImageUploader from '../ImageUploader';
import { Button, Form } from "react-bootstrap";

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

    const imgView = imgStr.length > 0 ?
        <img src = {imgStr} alt='Image'/> :
        <ImageComponent base64String={oldImg} />;

    return(
        <div style ={{display: 'flex', flexDirection: 'column'}}>
            <Form.Control as="textarea" rows={4}
                className="mb-2"
                placeholder="Enter description"
                defaultValue={text}
                onChange={e => setText(e.target.value)} />
            {imgView}
                <ImageUploader byteImageAction={(str, bytes) => {setImg(bytes); setImgStr(str)}} />
                <Button
                    variant="outline-primary"
                    className="mr-2"
                    onClick={endCreate}>Ok</Button>
        </div>
    )
}
export default NewsCreate;