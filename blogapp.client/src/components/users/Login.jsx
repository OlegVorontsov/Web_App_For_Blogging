import { useState } from "react";
import { SIGNUP_URL, getToken } from "../../services/commonService";
import { Button, Form } from "react-bootstrap";

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
        <div style={{maxWidth: '40%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <p>Login</p>
            <Form.Control
                className="mb-2"
                type="email"
                placeholder="Enter email"
                onChange={e => setUserName(e.target.value)} />
            <p>Password</p>
            <Form.Control
                className="mb-4"
                type="password"
                placeholder="Enter password"
                onChange={e => setPassword(e.target.value)} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="outline-primary" className="mr-2" onClick={enterClick}>Login</Button>
                <Button variant="link" onClick={registerBtnClick}>Sign up</Button>
            </div>
        </div>
    );
}

export default Login;


