import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import { EMAIL_PATERN, MAX_STRENGTH_PASSWORD, PASSWORD_PATERN } from '../../constants/constants';
import * as userService from '../../../service/userService';
import style from './Register.module.css';

export const Register = () => {
    const { isLog } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    if (isLog) {
        navigate('/');
    }
    const [register, setRegister] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setRegister((prevRegister) => ({
            ...prevRegister,
            [name]: value,
        }));
    };

    const checkPasswordStrength = (password) => {
        // Check for length
        if (!PASSWORD_PATERN.test(password)) {
            // If password does not match the pattern, return 0
            return 0;
        }
        // Otherwise, return the length of the password
        return password.length;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = register;

        // Check for empty fields
        if (!email || !password || !confirmPassword) {
            // Setting an error message if either field is empty
            setError('Please fill in all fields.');
            return;
        }

        // Email validation
        if (!EMAIL_PATERN.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setError('Passwords  do not match.');
            return;
        }

        const passwordStrength = checkPasswordStrength(password);
        if (passwordStrength < MAX_STRENGTH_PASSWORD) {
            setError('Password should be at least 8 characters long\nand contain a mix of letters, numbers, and special characters.');
            return;
        }

        try {
            // Check if user already exists with the same email
            const userExists = await userService.register(register);

            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            // Handle registration failure
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className={style['register-container']}>
            <form onSubmit={onSubmitHandler} className={style['register-form']}>
                <h1 className={style['register-heading']}>Register</h1>
                <div className={style['form-group']}>
                    <label htmlFor="email" className={style['form-label']}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={register.email}
                        onChange={onChange}
                        className={style['form-input']}
                        placeholder="Email..."
                        required
                    />
                </div>

                <div className={style['form-group']}>
                    <label htmlFor="password" className={style['form-label']}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={register.password}
                        onChange={onChange}
                        className={style['form-input']}
                        placeholder="Password..."
                        required
                    />
                </div>
                <div className={style['form-group']}>
                    <label htmlFor="confirmPassword" className={style['form-label']}>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={register.confirmPassword}
                        onChange={onChange}
                        className={style['form-input']}
                        placeholder="Confirm Password..."
                        required
                    />
                </div>
                {error && <p className={style['error']}>{error}</p>}
                <input type="submit" value="Register" className={style['form-button']} />
            </form>
        </div>
    );
};

