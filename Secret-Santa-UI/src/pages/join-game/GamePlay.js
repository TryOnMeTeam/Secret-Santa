import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar'
import "../dashboard/Dashboard.css"
import { useNavigate } from "react-router-dom";
import secretSantaTheme from '../../assets/secretSantaTheme.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { IoMdChatboxes } from "react-icons/io";
import { MdCameraswitch } from "react-icons/md";
import ErrorComponent from "../../components/Error/ErrorComponent.js";

function GamePlay() {
  const navigate = useNavigate();
  const gameId = localStorage.getItem('gameId');
  const [errorPopUp, setErrorPopUp] = useState({message: '', show: false});

  useEffect(() => {
    if (!gameId) {
      navigate('/secret-santa');
    }
  }, [gameId, navigate]);

  const onClickGoToWishlist = () => {
    navigate('/wishlist');
  };

  const onClickChatRoom = () => {
    navigate('/chat');
  };

  const onClickSwitchGame = () => {
    try {
      localStorage.removeItem('gameId')
      navigate('/secret-santa');
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
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
    width: '100%'
  };

  return (
    <div style={backgroundStyle} className='dashboard'>
      <div><Navbar /></div>
      <div className="dashboard-container">
        <button className="game-actions" style={{ width: '252px' }} onClick={onClickGoToWishlist}><FaCartShopping />Go To Wishlist</button>
        <button className="game-actions" style={{ width: '252px' }} onClick={onClickChatRoom}><IoMdChatboxes />Go To Chat Room</button>
        <button className="game-actions" style={{ width: '252px' }} onClick={onClickSwitchGame}><MdCameraswitch />Switch Game</button>
      </div>
      <ErrorComponent
        message={errorPopUp.message}
        show={errorPopUp.show}
        onClose={closeErrorPopUp}
      ></ErrorComponent>
    </div>

  )
}

export default GamePlay