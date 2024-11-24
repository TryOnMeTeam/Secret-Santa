import React, { useState } from "react";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import "./SecretSanta.css";

const SecretSanta = () => {
    const [participants, setParticipants] = useState([]);
    const [name, setName] = useState("");

    const addParticipant = () => {
        if (name.trim()) {
            setParticipants([...participants, name]);
            setName("");
        }
    };

    const shuffleParticipants = () => {
        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        alert(`Shuffled Participants: ${shuffled.join(", ")}`);
    };

    return (
        <div className="secret-santa">
            <h2>Secret Santa Setup</h2>
            <div className="form">
                <input
                    type="text"
                    placeholder="Enter participant name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={addParticipant}>Add</button>
            </div>
            <div className="participants">
                <h3>Participants:</h3>
                <ul>
                    {participants.map((p, index) => (
                        <li key={index}>{p}</li>
                    ))}
                </ul>
            </div>
            {participants.length > 1 && (
                <button onClick={shuffleParticipants} className="shuffle-btn">
                    Shuffle Participants
                </button>
            )}

            <LogoutButton />  
        </div>
    );
};

export default SecretSanta;
