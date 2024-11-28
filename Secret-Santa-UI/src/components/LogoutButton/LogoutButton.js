
import React from 'react';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";


const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <button onClick={handleLogout} style={{ borderRadius: '10px', padding: '10px', border: 'solid white',  background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaSignOutAlt size={20} color="white" />
        </button>
    );
};

export default LogoutButton;
