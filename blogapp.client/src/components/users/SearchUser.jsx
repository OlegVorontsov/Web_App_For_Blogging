import { useState } from "react";
import { getUsersByName } from "../../services/usersService";
import ImageComponent from '../ImageComponent';
import { LOGIN_URL, isUserOnline } from "../../services/commonService";

const SearchUser = () => {

    const [userName, setUserName] = useState([]);
    const [users, setUsers] = useState([]);

    if(isUserOnline()) window.location.href = LOGIN_URL;

    const getUsers = async () => {
        if(userName === '') return;
        const allUsers = await getUsersByName(userName);
        setUsers(allUsers);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <input style={{marginRight: '20px', marginBottom: '20px'}}
                type="text" defaultValue='' onChange={e => setUserName(e.target.value)}></input>
            <button className="btn btn-primary" onClick={getUsers}>Search</button>
            {users.length !== 0 ? 
            users.map((el, key) => {
                return <ShortUserView key={key} id = {el.id} name = {el.name} description = {el.description} photo = {el.photo}/>
            }) : <p>No such users</p>}
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
        <div className="user-short-data">
            <p>{id}</p>
            <p>{name}</p>
            <p>{description}</p>
        </div>
    </div>
    )
}


