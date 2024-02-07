import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

export default function AuthGuard(props) {
    const { isLog } = useContext(AuthContext);

    if (!isLog) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;

}