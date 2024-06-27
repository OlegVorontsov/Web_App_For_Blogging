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
                        marginBottom: '20px'}}>
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

const ShortUserView = ({id, name, description, photo }) => {

    const userClick = (userId) => {
    window.location.href = `/${userId}`;
    }

    return (
    <div className="user-short" onClick={() => userClick(id)}>
        <div className="user-short-img">
            <ImageComponent base64String={photo} />
        </div>
        <div>
            <p>{name}</p>
            <p>{description}</p>
        </div>
    </div>
    )
}


