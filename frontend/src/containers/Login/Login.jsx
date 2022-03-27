import React from 'react'
import { login } from '../../actions/auth'

export default function Login() {

    const LoginHandler = (email, password) => {
        login(email, password);
    };
    return (
        <div>Login</div>
    )
};
