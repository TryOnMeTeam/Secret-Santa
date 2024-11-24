
import React from 'react';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
