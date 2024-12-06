import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import QueueIcon from '@mui/icons-material/Queue';
import { wishlistHandler, getGiftNinjaWishes } from "../../../services/wishlistService.js";
import AddWishlist from '../add-wishlist/AddWishlist.js';
import { isGameActiveHandler } from '../../../services/gameService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import secretSantaTheme from '../../../assets/secretSantaTheme.jpg';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { IoGameController } from "react-icons/io5";
import ErrorComponent from "../../../components/Error/ErrorComponent.js";
import "./WishlistPage.css"

function WishlistPage() {
  const [myWishlist, setMyWishlist] = useState([]);
  const [giftNinjaWishlist, setGiftNinjaWishlist] = useState([]);
  const [openAddWishlist, setOpenAddWishlist] = useState(false);
  const [resetAddWishlistForm, setResetAddWishlistForm] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGiftNinjaView, setIsGiftNinjaView] = useState(false); // To toggle between the two wishlists
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [errorPopUp, setErrorPopUp] = useState({ message: '', show: false });

  const userId = localStorage.getItem('userId');
  const gameId = localStorage.getItem('gameId');

  const handleOnClickAddNewWishlist = () => {
    setOpenAddWishlist(true);
    setResetAddWishlistForm(true);
  };

  const handleCloseAddWishlist = () => {
    setResetAddWishlistForm(false);
    setOpenAddWishlist(false);
  };

  const handleToggleView = async () => {
    if (isGiftNinjaView) {
      setIsGiftNinjaView(false);
      await getWishlist(userId, gameId);
    } else {
      setIsGiftNinjaView(true);
      await getGiftNinjaWishlist();
    }
  };

  const isActive = async () => {
    try {
      const response = await isGameActiveHandler(gameId);
      setIsGameActive(response?.isActive === 1 ? true : false);
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const getWishlist = async (userId, gameId) => {
    try {
      const response = await wishlistHandler(userId, gameId);
      setMyWishlist(response[0]?.length ? response[0] : []);
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const getGiftNinjaWishlist = async () => {
    try {
      const response = await getGiftNinjaWishes(userId, gameId);
      setGiftNinjaWishlist(response[0]?.length ? response[0] : []);
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const closeErrorPopUp = () => {
    setErrorPopUp({ message: '', show: false });
  }


  useEffect(() => {
    if (userId) {
      getWishlist(userId, gameId);
      getGiftNinjaWishlist();
      isActive();
    }
  }, [userId]);

  const renderLinkColumn = (link) => {
    return link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <FaExternalLinkAlt />
      </a>
    ) : null;
  };

  const Wishlist = ({ wishList }) => {
    return (
      <div className='list-body'>
        <div className="game-box">
          <div className="game-head">
            <div className="game-heading">
              {!isGiftNinjaView ? (<strong>🎅  Mine  🎁</strong>) : (<strong>🎅  Ninja  🎁</strong>)}
            </div>
          </div>
        </div>
        <div className="player-box">
          <div className="player-item">
            <div className='player-shape'>
              <div className="game-heading">
                <strong>WishList</strong>
              </div>
            </div>
          </div>
        </div>
        <div className='fixed'>
          {wishList.map((item, index) => (
            <div className="list-item-box" key={index}>
              <div className="list-item">
                <div className="player-number">{index + 1}</div>
                <div className="player-name">
                  <strong>{item.wishName}</strong>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <OpenInNewIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {wishList.length ? (
          <div className="player-box" style={{ marginTop: '5px' }}>
            <div className="player-item">
              <div className='player-shape'>
                <div className="game-heading">
                  <strong>Total: {wishList.length}</strong>
                </div>
              </div>
            </div>
          </div>) : (<div></div>)
        }


      </div>
    );
  };

  const backgroundStyle = {
    backgroundImage: `url(${secretSantaTheme})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    paddingTop: '1rem',
  };

  return (
    <div style={backgroundStyle}>
      <div className="go-to-game-icon" onClick={() => navigate('/game')}>
        <IoGameController />
      </div>
      <div className='action-container'>
        <Button
          className="custom-button"
          variant="contained"
          style={{ backgroundColor: '#5F6D7C', color: 'white', width: '250px' }}
          onClick={() => { setIsGiftNinjaView(false); }}
        >
          My Wishlist
        </Button>
        <Button
          className="custom-button"
          variant="contained"
          style={{ backgroundColor: '#5F6D7C', color: 'white', width: '250px' }}
          onClick={() => { setIsGiftNinjaView(true); }}
          disabled={!isGameActive}
        >
          Ninja Wishlist
        </Button>
      </div>

      {/* Conditionally render the wishlist based on the current view */}
      {isGiftNinjaView ? (
        <Wishlist wishList={giftNinjaWishlist} />
      ) : (
        <div className='list-container'>
          <Wishlist wishList={myWishlist} />
          <Button
            className="custom-button"
            variant="outlined"
            style={{ backgroundColor: '#5F6D7C', color: 'white', width: '250px', marginTop: '15px' }}
            onClick={handleOnClickAddNewWishlist}
          >
            <QueueIcon style={{ marginRight: '10px' }} /> Add New Wish
          </Button>
        </div>
      )}

      <AddWishlist
        open={openAddWishlist}
        onClose={handleCloseAddWishlist}
        resetForm={resetAddWishlistForm}
        refreshWishlist={() => getWishlist(userId, gameId)} // Refresh Wishlist
      />
      <ErrorComponent
        message={errorPopUp.message}
        show={errorPopUp.show}
        onClose={closeErrorPopUp}
      ></ErrorComponent>
    </div>
  );
}

export default WishlistPage;
