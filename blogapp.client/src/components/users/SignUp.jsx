import { Button } from "react-bootstrap"
import { LOGIN_URL } from "../../services/commonService"
import { createUser } from "../../services/usersService"
import UserProfileCreate from "./UserProfileCreate"


const SignUp = () => {

    const userDefault = {
        id: 0,
        name: '',
        email: '',
        description: '',
        password: '',
        photo: ''
    }

    const signUpAction = (newUser) => {
        createUser(newUser);
    }

    const toLoginPage = () => {
        window.location.href = LOGIN_URL;
    }

    return (
        <div style={{ maxWidth: '40%',
            marginLeft: 'auto',
            marginRight: 'auto' }}>
                <UserProfileCreate user = {userDefault} setAction={signUpAction} />
        </div>

    )
}

export default SignUp;

