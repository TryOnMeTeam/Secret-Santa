import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
    const [showForm, setShowForm] = useState(false);

    const handlePlayClick = () => {
        setShowForm(true);
    };

    return (
        <div className="home-container">
            <div className="content">
                {!showForm && (
                    <>
                        <h2>Welcome to the Secret Santa Game!</h2>
                        <p>Plan a fun and exciting gift exchange with your friends.</p>
                        <a href="#" className="start-button" onClick={handlePlayClick}>
                            Play Now
                        </a>
                    </>
                )}
                {showForm && (
                    <div className="form-container">
                        <div className="screen">
                            <div className="screen__content">
                                <div className="login">
                                    <div className="login__input">
                                        <i className="login__icon fas fa-user"></i>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="login__input">
                                        <i className="login__icon fas fa-lock"></i>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <button className="button login__submit">
                                        <span className="button__text">Sign Up</span>
                                        <i className="button__icon fas fa-chevron-right"></i>
                                    </button>
                                    <button className="button login__submit">
                                        <span className="button__text">Log In</span>
                                        <i className="button__icon fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
