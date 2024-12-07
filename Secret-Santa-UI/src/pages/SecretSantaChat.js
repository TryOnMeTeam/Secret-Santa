import React, { useState, useEffect, useRef } from "react";
import { connectWebSocket } from "../websocket";
import Message from "../features/message";
import "../pages/SecretSantaChat.css";
import { CHAT_BOX_TYPE, NOTIFICATION_TYPE } from "../constants/secretSantaConstants";
import { FaPaperPlane } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import {markEmailAsNotSent, fetchMessages, fetchPendingMessages}  from '../services/messageService';
import { IoGameController } from "react-icons/io5";
import secretSantaTheme from '../assets/secretSantaTheme.jpg';
import ErrorComponent from "../components/Error/ErrorComponent.js";

const SecretSantaChat = () => {

    const userId = localStorage.getItem('userId');
    const gameId = localStorage.getItem('gameId');

    const [messagesSanta, setMessagesSanta] = useState([]); // Default to an empty array
    const [messagesNinja, setMessagesNinja] = useState([]); // Default to an empty array
    const [errorPopUp, setErrorPopUp] = useState({message: '', show: false});
    
    const [secretSantaInputMessage, setSecretSantaInputMessage] = useState("");
    const [giftNinjaInputMessage, setGiftNinjaInputMessage] = useState("");
    const [ws, setWs] = useState(null);
    const [chatMode, setChatMode] = useState(null);

    const santaMessagesEndRef = useRef(null);
    const ninjaMessagesEndRef = useRef(null);
    const [secretSantaMessagesHidden, setSecretSantaMessagesHidden] = useState(true);
    const [giftNinjaMessagesHidden, setGiftNinjaMessagesHidden] = useState(true);
    const chatModeRef = useRef(chatMode);
    const navigate = useNavigate();

    const toggleSecretSantaBadgeVisibility = (value) => {
        setSecretSantaMessagesHidden(value);
    };

    const toggleGiftNinjaBadgeVisibility = (value) => {
        setGiftNinjaMessagesHidden(value);
    };

    const markMessagesAsRead = async(userId, gameId, chatBoxType) => {
        try {
            await markEmailAsNotSent(userId, gameId, chatBoxType);
        } catch (error) {
            setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
        }
    }

    const fetchChatMessages = async () => {
        try {
            const response = await fetchMessages(userId, gameId);
            const { secretSantaMessages, giftNinjaMessages } = response;

            setMessagesSanta(secretSantaMessages || []);
            setMessagesNinja(giftNinjaMessages || []);
        } catch (error) {
            setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
        }
    };

    const fetchUnReadMessages = async () => {
        try {
            const response = await fetchPendingMessages(userId, gameId);
            const { secretSantaPendingMessages, giftNinjaPendingMessages } = response;

            toggleSecretSantaBadgeVisibility(!secretSantaPendingMessages);
            toggleGiftNinjaBadgeVisibility(!giftNinjaPendingMessages);
        } catch (error) {
            setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
        }
    };

    useEffect(() => {
        chatModeRef.current = chatMode;
    }, [chatMode]);


    useEffect(() => {
        fetchChatMessages();
        fetchUnReadMessages();
        if (userId) {
            const websocket = connectWebSocket(userId, (message) => {
                if (message.type === NOTIFICATION_TYPE.MESSAGE) {
                    const reverserChatBoxType = message.chatBoxType === CHAT_BOX_TYPE.SECRET_SANTA ? CHAT_BOX_TYPE.GIFT_NINJA : CHAT_BOX_TYPE.SECRET_SANTA
                    if (reverserChatBoxType === CHAT_BOX_TYPE.SECRET_SANTA) {
                        if (!chatModeRef.current || chatModeRef.current === CHAT_BOX_TYPE.GIFT_NINJA) {
                            toggleSecretSantaBadgeVisibility(false);
                        }
                        const newMessage = { from: "secretSanta", content: message.content };
                        setMessagesSanta((prev) => [...prev, newMessage]);
                    } else if (reverserChatBoxType === CHAT_BOX_TYPE.GIFT_NINJA) {
                        if (!chatModeRef.current || chatModeRef.current === CHAT_BOX_TYPE.SECRET_SANTA) {
                            toggleGiftNinjaBadgeVisibility(false);
                        }
                        const newMessage = { from: "giftNinja", content: message.content };
                        setMessagesNinja((prev) => [...prev, newMessage]);
                    }
                }
            });
            setWs(websocket);
        }
    }, [userId]);

    useEffect(() => {
        if (chatMode) {
            console.log("Chat mode changed:", chatMode);
        }
    }, [chatMode]);
    

    useEffect(() => {
        if (chatMode === CHAT_BOX_TYPE.SECRET_SANTA && santaMessagesEndRef.current) {
            santaMessagesEndRef.current.scrollTop = santaMessagesEndRef.current.scrollHeight;
        } else if (chatMode === CHAT_BOX_TYPE.GIFT_NINJA && ninjaMessagesEndRef.current) {
            ninjaMessagesEndRef.current.scrollTop = ninjaMessagesEndRef.current.scrollHeight;
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

    const closeErrorPopUp = () => {
        setErrorPopUp({ message: '', show: false });
    }

    const backgroundStyle = {
        backgroundImage: `url(${secretSantaTheme})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
      };

    return (
        <div style={backgroundStyle} className="chat-container">
            <div className="go-to-game-icon" onClick={() => navigate('/game')}>
                <IoGameController />
            </div>
            {/* <Navbar/> */}
            <div className="chat-mode-buttons">
                <div className="chat-button-container"style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Badge
                        badgeContent="🎁"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: 'white', // White badge background
                                color: 'black', // Optional: Black text inside the badge
                            },
                        }}
                        invisible={secretSantaMessagesHidden}
                    >
                        <Button className ="custom-button"
                            variant="contained"
                            style={{ backgroundColor: '#5F6D7C', color: 'white', width: '250px'}}
                            onClick={() => {
                                toggleSecretSantaBadgeVisibility(true);
                                setChatMode(CHAT_BOX_TYPE.SECRET_SANTA);
                                markMessagesAsRead(userId, gameId, CHAT_BOX_TYPE.SECRET_SANTA);
                            }}
                        >
                            Talk to My Secret Santa
                        </Button>
                    </Badge>
                    <Badge
                        badgeContent="🎁" // Replace 7 with a symbol
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: 'white', // White badge background
                                color: 'black', // Optional: Black text inside the badge
                            },
                        }}
                        invisible={giftNinjaMessagesHidden}
                    >
                        <Button
                            className ="custom-button"
                            variant="contained"
                            style={{ backgroundColor: '#5F6D7C', color: 'white', width: '250px'}}
                            onClick={() => {
                                toggleGiftNinjaBadgeVisibility(true);
                                setChatMode(CHAT_BOX_TYPE.GIFT_NINJA);
                                markMessagesAsRead(userId, gameId, CHAT_BOX_TYPE.GIFT_NINJA);
                            }}
                        >
                            Talk to My Gift Ninja
                        </Button>
                    </Badge>
                </div>
            </div>

            

            {chatMode === CHAT_BOX_TYPE.SECRET_SANTA && (
                <div className="chat-window">
                    <header className="chat-header">Secret Santa</header>
                    <button className="close-chat-button" onClick={closeChat}>
                        ✖
                    </button>
                    <div className="chat-messages" ref={santaMessagesEndRef}>
                        {messagesSanta?.map((msg, idx) => (
                            <Message key={idx} message={msg} />
                        ))}
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
                    <div className="chat-messages" ref={ninjaMessagesEndRef}>
                        {messagesNinja?.map((msg, idx) => (
                            <Message key={idx} message={msg} />
                        ))}
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
                  <ErrorComponent
        message={errorPopUp.message}
        show={errorPopUp.show}
        onClose={closeErrorPopUp}
      ></ErrorComponent>
        </div>
    );
};

export default SecretSantaChat;
