import { useState } from "react";
import { getToken } from "../../services/commonService";

const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const enterClick = () => {
        getToken(userName, password);
    }

    return (
        <div>
            <p>Login</p>
            <input type="text" onChange={e => setUserName(e.target.value)}></input>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}></input>
            <button className="btn btn-primary" onClick={enterClick}>Login</button>
        </div>
    );
}

export default Login;


