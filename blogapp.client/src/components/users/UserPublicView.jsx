import { useState, useEffect } from "react";
import UserView from "./UserView";
import { GetPublicUser, subscribeToUser } from "../../services/usersService";
import { useParams } from "react-router-dom";

const UserPublicView = () => {
    const [user, setUser] = useState({
        id: 0,
        name: '',
        email: '',
        description: '',
        password: '',
        photo: ''
      });

      const params = useParams();
      const userId = params.userId;

      const subscribeClick = () => {
        subscribeToUser(userId);
      }
    
      // Загрузка данных пользователя с помощью useEffect и fetch
      useEffect(() => {
        const fetchUser = async () => {
            const data = await GetPublicUser(userId);
            setUser(data);
        };

        fetchUser();
      }, []);

      return <UserView user = {user} isProfile={false}/>;
}
export default UserPublicView;