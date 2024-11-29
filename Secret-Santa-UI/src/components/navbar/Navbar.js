import React from 'react'
import "./Navbar.css"
import LogoutButton from '../LogoutButton/LogoutButton';

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
            </div>
            <LogoutButton />  
        </nav>
    )
}

export default Navbar;