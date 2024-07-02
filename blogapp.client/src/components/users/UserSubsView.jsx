import { useEffect, useState } from "react"
import { getUserSubs } from "../../services/usersService";
import ImageComponent from "../ImageComponent";
import { Button } from "react-bootstrap";

export const UserSub = ({id, name, photo, updateAction}) => {

    const deleteSubView = async () => {
        await deleteSub(id);
        updateAction();
    };

    const userClick = (userId) => {
        setTimeout(() => {window.location.href = `/${userId}`}, 300);
    }

    return (
        <div onClick={() => userClick(id)} className="user-sub-item">
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                <Button variant="outline-danger" onClick={() => deleteSubView()}>Delete sub</Button>
            </div>
            <SubView id={id} name={name} photo={photo} />
        </div>
    )
}

const SubView = ({name, photo}) => {

    return (
        <button style={{width: '100%', minHeight: '150px'}} className="circle-effect-btn" onClick={createRipple}>
            <div style={{display: 'flex', gap: '20px'}}>
                <div style={{maxWidth: '200px', borderRadius: '5px', overflow: 'hidden'}}>
                    <ImageComponent base64String={photo} />
                </div>
                <div>
                    <p>{name}</p>
                </div>
            </div>
        </button>
    )
}

export const UserSubsView = ({userId}) => {
    const[users, setUsers] = useState([]);

    const getAllUserSubs = async () => {
        if (userId === 0) return;
        const allSubs = await getUserSubs(userId);
        setUsers(allSubs);
    }

    useEffect ( ()=> {
        getAllUserSubs();
    },[userId]);

    return (
        <div>
            <h5>You're subscribed to:</h5>
            <div style={{display: 'flex', gap: '10px'}}>
            {users.map((el, key) => {
                return <UserSub key={key} 
                    id = {el.id}
                    name = {el.name} 
                    photo = {el.photo}
                    updateAction={getAllUserSubs}
                />
            })}
            </div>
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