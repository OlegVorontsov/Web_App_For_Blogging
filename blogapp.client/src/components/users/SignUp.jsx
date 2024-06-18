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
        window.location.href = LOGIN_URL
    }

    return (
        <div>
            <UserProfileCreate user = {userDefault} setAction={signUpAction} />
            <button className="btn btn-link" onClick={toLoginPage}>Sign in</button>
        </div>

    )
}

export default SignUp;

