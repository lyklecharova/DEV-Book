import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

export const Logout = () => {
    //use the useContext hook to access values from the authentication context
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    // Remove user information from local storage upon logout
    localStorage.removeItem("UserInfo");
    isAuthenticated(null);
    // Redirect the user to the homepage after logout
    navigate("/");
    //return null since the component doesn't render anything visible on the screen
    return (
        null
    );
};