import { useState } from "react";
import { getUsersByName } from "../../services/usersService";
import ImageComponent from '../ImageComponent';
import { LOGIN_URL, isUserOnline } from "../../services/commonService";
import { Button, Form } from "react-bootstrap";

const SearchUser = () => {
    const [userName, setUserName] = useState([]);
    const [users, setUsers] = useState([]);

    if(!isUserOnline()) window.location.href = LOGIN_URL;

    const getUsers = async () => {
        if(userName === '') return;
        const allUsers = await getUsersByName(userName);
        setUsers(allUsers);
    }

    return (
        <div>
            <div style={{ display: 'flex',
                        gap: '10px',
                        marginBottom: '10px'}}>
                <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    defaultValue=''
                    onChange={e => setUserName(e.target.value)} />
                <Button variant="outline-primary" onClick={getUsers}>Search</Button>
            </div>
            <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {users.length !== 0 ? 
                users.map((el, key) => {
                    return <ShortUserView
                            key={key}
                            id = {el.id}
                            name = {el.name}
                            description = {el.description}
                            photo = {el.photo}/>
                }) : <p style={{marginLeft: '12px'}}>No such users</p>}
            </div>
        </div>
    );
}
export default SearchUser;

export const ShortUserView = ({id, name, description, photo }) => {

    const userClick = (userId) => {
        setTimeout(() => {window.location.href = `/${userId}`}, 300);
    }

    return (
    <div onClick={() => userClick(id)}>
        <button className="user-short box-shadow-blue circle-effect-btn" onClick={createRipple}>
        <div className="user-short-img">
            <ImageComponent base64String={photo} />
        </div>
            <div style={{maxWidth: '160px', textAlign: 'left'}}>
                <p>{name}</p>
                <p>{description}</p>
            </div>
        </button>
    </div>
    )
}

const createRipple = (e) => {
    let btn = e.target;
    let boundingBox = btn.getBoundingClientRect();
    let x = e.clientX - boundingBox.left;
    let y = e.clientY - boundingBox.top;

    let ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);

    ripple.addEventListener('animationend', () => { ripple.remove() });
}





