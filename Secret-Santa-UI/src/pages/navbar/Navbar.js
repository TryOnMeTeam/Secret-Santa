import React from 'react'
import "./Navbar.css"
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {

    const handleProfileClick = () => {
        alert("Profile icon clicked!");
    };
    return (
        <nav className="navbar">
            <div className="navbar-left"></div>
            <div className="navbar-center">
                <h1 className="navbar-heading">Secret Santa</h1>
            </div>
            <div className="navbar-right">
                {/* <FaUserCircle 
                    className="profile-icon" 
                    onClick={handleProfileClick}
                /> */}
            </div>
            <LogoutButton />  
        </nav>
    )
}

export default Navbar;