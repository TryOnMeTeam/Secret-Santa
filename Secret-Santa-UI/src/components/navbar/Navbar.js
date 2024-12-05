import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import "./Navbar.css";
import LogoutButton from '../LogoutButton/LogoutButton';

function Navbar() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/dashboard");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <IoHome
                    className="home-icon"
                    onClick={handleHomeClick}
                    title="Go to Home"
                />
            </div>
            <div className="navbar-center">
                <h1 className="navbar-heading">Secret Santa</h1>
            </div>
            <div className="navbar-right">
                <LogoutButton />
            </div>
        </nav>
    );
}

export default Navbar;
