import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import * as userService from '../../../service/userService';

import style from './Login.module.css';

export const Login = () => {
    const { isLog, setIsAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    if (isLog) {
        navigate('/');
    }

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Checking if the email and password fields are empty
        if (login.email.trim() === "" || login.password.trim() === "") {
            // Setting an error message if either field is empty
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // Email validation using regular expression
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(login.email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        try {
            const loginInformation = await userService.login(login);
            
            // Assuming loginInformation indicates successful login
            if (loginInformation) {
                localStorage.setItem("UserInfo", JSON.stringify(loginInformation));
                // Update authentication state
                setIsAuthenticated(true);
                console.log("Login successful:", loginInformation);
                // Redirect to homepage after successful login
                navigate('/');
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(true);
        }
    };

    return (
        <div className={style['login-container']}>
            <form onSubmit={onSubmitHandler} method="post" className={style['login-form']}>
                <h1 className={style['login-heading']}>Login</h1>
                <div className={style['form-group']}>
                    <label className={style['form-label']} htmlFor="email">
                        Email:
                    </label>
                    <input
                        className={style['form-input']}
                        type="email"
                        id="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={login.email}
                        required={true}
                        autoComplete="email"
                        placeholder="Email..."
                    />
                </div>
                {errorMessage && <p className={style['error']}>{errorMessage}</p>}

                <div className={style['form-group']}>
                    <label className={style['form-label']} htmlFor="password">
                        Password:
                    </label>
                    <input
                        className={style['form-input']}
                        type="password"
                        id="password"
                        onChange={onChangeHandler}
                        name="password"
                        value={login.password}
                        placeholder="Password..."
                        required={true}
                        autoComplete="password"
                    />
                </div>
                {error && <p className={style['error']}>Invalid email or password</p>}

                <input type="submit" defaultValue="Login" className={style['form-button']} />

                <p>
                    Do not have an account?
                    <br />
                    <div className={style['register-link']}>
                        <NavLink to="/register">Register now!</NavLink>
                    </div>
                </p>
            </form>
        </div>
    );
};
