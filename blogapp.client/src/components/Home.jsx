import { useEffect, useState } from "react";
import { getAllUsers } from "../services/usersService";
import { ShortUserView } from "./users/SearchUser";

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllUsers();
            setUsers(data);
        };
        fetchUsers();
      }, []);

    return (
        <div>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <h1>Welcome to web application for blogging by Vorontsov Oleg</h1>
                <h4>Meet our bloggers!</h4>
            </div>
            <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px'}}>
                {users.length !== 0 ? 
                    users.map((el, key) => {
                    return <ShortUserView
                            key={key}
                            id = {el.id}
                            name = {el.name}
                            description = {el.description}
                            photo = {el.photo} />
                }) : <p>Sorry...there're no users yet:(</p>}
            </div>
            <div style={{display: 'flex', justifyContent:'center', gap: '20px'}}>
                <p>Build with React.js and ASP.NET Core</p>
                <a variant="link" href="https://github.com/OlegVorontsov/BlogAppMoveToDesktop">View source code on GitHub</a>
            </div>
        </div>
    );
}

export default Home;