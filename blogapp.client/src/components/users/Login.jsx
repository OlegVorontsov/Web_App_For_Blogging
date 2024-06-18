import { useState } from "react";
import { SIGNUP_URL, getToken } from "../../services/commonService";

const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const enterClick = () => {
        getToken(userName, password);
    }

    const registerBtnClick = () => {
        window.location.href = SIGNUP_URL;
    }

    return (
        <div>
            <p>Login</p>
            <input type="text" onChange={e => setUserName(e.target.value)}></input>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}></input>
            <button className="btn btn-primary" onClick={enterClick}>Login</button>
            <button className="btn btn-link" onClick={registerBtnClick}>Sign up</button>
        </div>
    );
}

export default Login;


