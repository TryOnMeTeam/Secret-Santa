import React from "react";
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate('/login');
    };

    return (
        <div className="home-container">
            <div className="content">
                <h2>Welcome to the Secret Santa Game!</h2>
                <p>Plan a fun and exciting gift exchange with your friends.</p>
                <a href="#" className="start-button" onClick={handlePlayClick}>
                    Play Now
                </a>
            </div>
        </div>
    );
};

export default HomePage;
