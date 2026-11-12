import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';

export const Logout = () => {
    //use the useContext hook to access values from the authentication context
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        // Remove stored user information
        localStorage.removeItem('UserInfo');

        // Clear authentication state
        isAuthenticated(null);

        // Redirect to homepage
        navigate('/', { replace: true });
    }, [isAuthenticated, navigate]);

    return null;
};
