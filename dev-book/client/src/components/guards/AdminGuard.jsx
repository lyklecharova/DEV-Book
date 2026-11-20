import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

export default function AdminGuard() {
    const { isLog, role } = useContext(AuthContext);

    if (!isLog) {
        return <Navigate to="/login" replace />;
    }

    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
