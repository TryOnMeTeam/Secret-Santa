import React from 'react';
import { logout } from '../../services/authService';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            logout();
            window.location.reload();
            navigate("/login");
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                borderRadius: '10px',
                padding: '10px',
                border: 'solid white',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <FaSignOutAlt size={20} color="white" />
        </button>
    );
};

export default LogoutButton;
