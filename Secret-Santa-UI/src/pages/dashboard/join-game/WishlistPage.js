import React, { useEffect, useState } from 'react';
import { ListTableColumn } from '../../../models/ListTableColumn.js';
import ListTable from '../../list-table/ListTable.js';
import { wishlistHandler } from '../../../services/wishlistService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import AddWishlist from '../add-wishlist/AddWishlist.js';
import { isGameActiveHandler } from '../../../services/gameService.js';
import { GAME_CODE_KEY } from '../../../constants/secretSantaConstants.js';
import { getWishlistByUserAndGame } from "../../../services/wishlistService.js";
import { FaExternalLinkAlt } from 'react-icons/fa'; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from '../../../components/navbar/Navbar.js';

function WishlistPage() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      getWishlist(userId, gameId);
    } else {
      setIsGiftNinjaView(true);
      handleOnClickGiftNinjaWishlist();
    }
  };

  const isActive = async () => {
    try {
      const response = await isGameActiveHandler(gameId);
      setIsGameActive(response?.isActive === 1 ? true : false);
      return response;
    } catch (error) {
      showAlert(error, 'error');
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
  const gameId = localStorage.getItem('gameId');
  const gameCode = localStorage.getItem(GAME_CODE_KEY);

  const getWishlist = async (userId, gameId) => {
    try {
      const response = await wishlistHandler(userId, gameId);
      setRows(!response[0]?.length ? response[0] : []);
      return response[0];
    } catch (error) {
      showAlert(error, 'error');
    }
  };

  const getGiftNinjaWishlist = async () => {
    try {
      const response = await getWishlistByUserAndGame(userId, gameCode);
      setRows(!response[0].length ? response[0] : []);
      return response[0];
    } catch (error) {
      showAlert(error, 'error');
    }
  };

  const refreshWishlist = async () => {
    if (userId && isGiftNinjaView) {
      setIsGiftNinjaView(false);
      await getWishlist(userId, gameId);
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
      getWishlist(userId, gameId);
      isActive();
    }
  }, [userId]);

  const backgroundStyle = {
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20231124/pngtree-happy-santa-claus-preparing-christmas-presents-merry-christmas-concept-background-image_15282600.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    paddingTop: '7rem',
  };

  return (
    <div style={ backgroundStyle }>
      <Navbar/>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Your Wishlist" value="1" />
              <Tab label="Ninja Wishlist" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ListTable columns={columns} rows={rows} actionButtons={actions} />

            <AddWishlist
              open={openAddWishlist}
              onClose={handleCloseAddWishlist}
              resetForm={resetAddWishlistForm}
              refreshWishlist={refreshWishlist}
            />
          </TabPanel>
          <TabPanel value="2">
            <ListTable columns={columns} rows={rows} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

export default WishlistPage