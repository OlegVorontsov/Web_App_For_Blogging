import { useState, useEffect } from "react";
import UserView from "./UserView";
import { GetPublicUser } from "../../services/usersService";
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
    
      // Загрузка данных пользователя с помощью useEffect и fetch
      useEffect(() => {
        const fetchUser = async () => {
            const user = await GetPublicUser(userId);
            setUser(user);
        };

        fetchUser();
      }, []);

      return <UserView user = {user} />;
}
export default UserPublicView;