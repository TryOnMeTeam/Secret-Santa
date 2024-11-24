import React, { useState, useEffect, useRef } from "react";
import { connectWebSocket } from "../websocket";
import Message from "../features/message";
import "../pages/SecretSantaChat.css";
import { CHAT_BOX_TYPE, NOTIFICATION_TYPE } from "../constants/secretSantaConstants";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

const SecretSantaChat = () => {
    const [userId] = localStorage.getItem('userId');
    const [gameId] = useState(1);

    const [messagesSanta, setMessagesSanta] = useState();
    const [messagesNinja, setMessagesNinja] = useState();

    const [secretSantaInputMessage, setSecretSantaInputMessage] = useState("");
    const [giftNinjaInputMessage, setGiftNinjaInputMessage] = useState("");
    const [ws, setWs] = useState(null);
    const [chatMode, setChatMode] = useState(null);

    const santaMessagesEndRef = useRef(null);
    const ninjaMessagesEndRef = useRef(null);


    const fetchChatMessages = async () => {
        try {
            axios.defaults.baseURL = 'http://localhost:5001';
            const response = await axios.post('/api/chat/getMessages', {
                userId: userId,
                gameId: gameId
            })
            const { secretSantaMessages, giftNinjaMessages } = response.data;

            setMessagesSanta(secretSantaMessages || []);
            setMessagesNinja(giftNinjaMessages || []);
        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    };


    useEffect(() => {
        fetchChatMessages();
        if (userId) {
            const websocket = connectWebSocket(userId, (message) => {
                if (message.type === NOTIFICATION_TYPE.MESSAGE) {
                    if (message.chatBoxType === CHAT_BOX_TYPE.SECRET_SANTA) {
                        const newMessage = { from: "secretSanta", content: message.content };
                        setMessagesSanta((prev) => [...prev, newMessage]);
                    } else if (message.chatBoxType === CHAT_BOX_TYPE.GIFT_NINJA) {
                        const newMessage = { from: "giftNinja", content: message.content };
                        setMessagesNinja((prev) => [...prev, newMessage]);
                    }
                }
            });
            setWs(websocket);
        }
    }, [userId]);

    useEffect(() => {
        if (chatMode === CHAT_BOX_TYPE.SECRET_SANTA && santaMessagesEndRef.current) {
            santaMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (chatMode === CHAT_BOX_TYPE.GIFT_NINJA && ninjaMessagesEndRef.current) {
            ninjaMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messagesSanta, messagesNinja, chatMode]);

    const sendMessage = () => {
        if (ws && (secretSantaInputMessage || giftNinjaInputMessage)) {
            const messageContent =
                chatMode === CHAT_BOX_TYPE.SECRET_SANTA ? secretSantaInputMessage : giftNinjaInputMessage;

            ws.send(
                JSON.stringify({
                    type: NOTIFICATION_TYPE.MESSAGE,
                    userId,
                    chatBoxType: chatMode,
                    content: messageContent,
                    gameId: gameId
                })
            );

            const newMessage = { from: "Me", content: messageContent };

            if (chatMode === CHAT_BOX_TYPE.SECRET_SANTA) {
                setMessagesSanta((prev) => [...prev, newMessage]);
                setSecretSantaInputMessage("");
            } else if (chatMode === CHAT_BOX_TYPE.GIFT_NINJA) {
                setMessagesNinja((prev) => [...prev, newMessage]);
                setGiftNinjaInputMessage("");
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const closeChat = () => {
        setChatMode(null);
    };

    return (
        <div className="chat-container">
            <div className="chat-mode-buttons">
                <button
                    className="mode-button"
                    onClick={() => {
                        setChatMode(CHAT_BOX_TYPE.SECRET_SANTA);
                    }}
                >
                    Talk to My Secret Santa
                </button>
                <button
                    className="mode-button"
                    onClick={() => {
                        setChatMode(CHAT_BOX_TYPE.GIFT_NINJA);
                    }}
                >
                    Talk to My Gift Ninja
                </button>
            </div>

            {chatMode === CHAT_BOX_TYPE.SECRET_SANTA && (
                <div className="chat-window">
                    <header className="chat-header">Secret Santa</header>
                    <button className="close-chat-button" onClick={closeChat}>
                        ✖
                    </button>
                    <div className="chat-messages">
                        {messagesSanta?.map((msg, idx) => (
                            <Message key={idx} message={msg} />
                        ))}
                        <div ref={santaMessagesEndRef} />
                    </div>
                    <footer className="chat-footer">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={secretSantaInputMessage}
                            onChange={(e) => setSecretSantaInputMessage(e.target.value)}
                            onKeyDown={handleKeyPress} // Handle Enter key
                            className="message-input"
                        />
                        <button onClick={sendMessage} className="send-button">
                            <FaPaperPlane /> {/* Send icon */}
                        </button>
                    </footer>
                </div>
            )}

            {chatMode === CHAT_BOX_TYPE.GIFT_NINJA && (
                <div className="chat-window">
                    <header className="chat-header">Gift Ninja</header>
                    <button className="close-chat-button" onClick={closeChat}>
                        ✖
                    </button>
                    <div className="chat-messages">
                        {messagesNinja?.map((msg, idx) => (
                            <Message key={idx} message={msg} />
                        ))}
                        <div ref={ninjaMessagesEndRef} />
                    </div>
                    <footer className="chat-footer">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={giftNinjaInputMessage}
                            onChange={(e) => setGiftNinjaInputMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="message-input"
                        />
                        <button onClick={sendMessage} className="send-button">
                            <FaPaperPlane />
                        </button>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default SecretSantaChat;
