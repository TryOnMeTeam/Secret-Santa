import React, { useEffect, useState } from 'react';
import { ListTableColumn } from '../../../models/ListTableColumn';
import ListTable from '../../list-table/ListTable';
import { wishlistHandler } from '../../../services/wishlistService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import AddWishlist from '../add-wishlist/AddWishlist.js';
import { isGameActiveHandler } from '../../../services/gameService.js';
import { GAME_CODE_KEY } from '../../../constants/secretSantaConstants.js';
import { getWishlistByUserAndGame } from "../../../services/wishlistService.js";
import { FaExternalLinkAlt } from 'react-icons/fa'; 

function JoinGame() {

  const [rows, setRows] = useState([]);
  const [openAddWishlist, setOpenAddWishlist] = useState(false);
  const [resetAddWishlistForm, setResetAddWishlistForm] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGiftNinjaView, setIsGiftNinjaView] = useState(false); 
  const { showAlert } = useAlert();

  const columns = [
    new ListTableColumn('wishName', 'Product Name', 50),
    new ListTableColumn('link', 'Product Link', 50, true)
  ];

  const handleOnClickAddNewWishlist = () => {
    setOpenAddWishlist(true);
    setResetAddWishlistForm(true);
  };

  const handleCloseAddWishlist = () => {
    setResetAddWishlistForm(false);
    setOpenAddWishlist(false);
  }

  const handleOnClickGiftNinjaWishlist = async () => {
    setIsGiftNinjaView(true); 
    await getGiftNinjaWishlist();
  }

  const handleToggleView = () => {
    if (isGiftNinjaView) {
      setIsGiftNinjaView(false);
      getWishlist(userId);
    } else {
      setIsGiftNinjaView(true);
      handleOnClickGiftNinjaWishlist();
    }
  };

  const isActive = async () => {
    try {
      const response = await isGameActiveHandler(gameCode);
      setIsGameActive(response[0].isActive === 1 ? true : false);
      return response;
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const actions = [
    {
      label: 'Add New Products',
      onClick: handleOnClickAddNewWishlist,
      disabled: isGiftNinjaView,
    },
    {
      label: isGiftNinjaView ? 'Your Wishlist' : 'Your Gift Ninja Wishlist',
      onClick: handleToggleView,
      disabled: !isGameActive,
    },
  ];

  const userId = localStorage.getItem('userId');
  const gameCode = localStorage.getItem(GAME_CODE_KEY);

  const getWishlist = async (userId) => {
    try {
      const response = await wishlistHandler(userId);
      setRows(response !== '' ? response : []);
      return response;
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const getGiftNinjaWishlist = async () => {
    try {
      const response = await getWishlistByUserAndGame(userId, gameCode);
      setRows(response !== '' ? response : []);
      return response;
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const refreshWishlist = async () => {
    if (userId && isGiftNinjaView) {
      setIsGiftNinjaView(false);
      await getWishlist(userId);
    }
  };

  const renderLinkColumn = (link) => {
    return link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <FaExternalLinkAlt />
      </a>
    ) : null;
  };

  useEffect(() => {
    if(userId) {
      getWishlist(userId);
      isActive();
    }
  }, [userId]);

  return (
    <div style={{'paddingTop': '4rem'}}>
      <ListTable
        columns={columns}
        rows={rows}
        actionButtons={actions}
        renderLinkColumn={renderLinkColumn}
      />

      <AddWishlist
        open={openAddWishlist}
        onClose={handleCloseAddWishlist}
        resetForm={resetAddWishlistForm}
        refreshWishlist={refreshWishlist}
      />
    </div>
  )
}

export default JoinGame