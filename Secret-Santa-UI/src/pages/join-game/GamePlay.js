import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "../dashboard/Dashboard.css"
import HostGame from '../host-game/HostGame';
import CodeDialog from '../shared/code/CodeDialog';
import { useNavigate } from "react-router-dom";
import { GAME_CODE_KEY } from '../../constants/secretSantaConstants';

function GamePlay() {
  const navigate = useNavigate();

  const onClickGoToWishlist = () => {
    navigate('/wishlist');
  };
  const onClickChatRoom = () => {
    navigate('/chat');  
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20231124/pngtree-happy-santa-claus-preparing-christmas-presents-merry-christmas-concept-background-image_15282600.jpg")',
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
        </div>
    </div>
  )
}

export default GamePlay