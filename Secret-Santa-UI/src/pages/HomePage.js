import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const handlePlayClick = () => {
        navigate('/login');
    };

    const login = () => {
        navigate("/dashboard");
    };

    return (
        <div className="home-container">
            <div className="content">
                <div className="content-heading">
                    Welcome to the Secret Santa Game!
                </div>
                <p className="content-sub-heading">Plan a fun and exciting gift exchange with your friends.</p>
                <a href="#" className="start-button" onClick={handlePlayClick}>
                    Play Now
                </a>
            </div>
        </div>
    );
};

export default HomePage;
