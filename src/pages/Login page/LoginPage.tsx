//import React from "react";
import axios from 'axios';
//import { Axios } from "axios";
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    //const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/auth/login', {
                //username,
                email,
                password,
            })
            .then((response) => {
                //console.log(response);
                if (response.data.status) {
                    navigate('/books');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className='sign-up-container'>
            <div>Login</div>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                {/* <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                /> */}
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    autoComplete='off'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    placeholder='******'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
                <p>Don't have an account?</p> <Link to='/signup'>Sign Up</Link>
            </form>
        </div>
    );
};

export default Login;
