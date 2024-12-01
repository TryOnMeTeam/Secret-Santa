import React from 'react';
import { logout } from '../../services/authService';
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            logout();
            window.location.reload();
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
