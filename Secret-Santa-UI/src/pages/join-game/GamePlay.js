import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "../dashboard/Dashboard.css"
import { useNavigate } from "react-router-dom";
import secretSantaTheme from '../../assets/secretSantaTheme.jpg';
import { useAlert } from '../../services/context/AlertContext.js';
import { exitGame } from '../../services/gameService';

function GamePlay() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const userId = localStorage.getItem('userId');
  const gameId = localStorage.getItem('gameId');

  const onClickGoToWishlist = () => {
    navigate('/wishlist');
  };

  const onClickChatRoom = () => {
    navigate('/chat');
  };

  const onClickExitGame = async () => {
    try {
      await exitGame(userId, gameId);
      navigate('/secret-santa');
      localStorage.removeItem('gameId')
    } catch (error) {
      showAlert(error, 'error');
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${secretSantaTheme})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%'
  };

  return (
    <div style={backgroundStyle} className='dashboard'>
        <div><Navbar/></div>
        <div className="dashboard-container">
          <button className="game-actions" style={{width: '252px'}} onClick={onClickGoToWishlist}>Go To Wishlist</button>
          <button className="game-actions" style={{width: '252px'}} onClick={onClickChatRoom}>Go To Chat Room</button>
          <button className="game-actions" style={{width: '252px'}} onClick={onClickExitGame}>Exit Game</button>
        </div>
    </div>
  )
}

export default GamePlay