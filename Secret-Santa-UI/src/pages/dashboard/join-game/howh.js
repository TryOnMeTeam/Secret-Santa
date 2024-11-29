import React, { useEffect, useState } from 'react';
import { ListTableColumn } from '../../../models/ListTableColumn.js';
import ListTable from '../../list-table/ListTable.js';
import { wishlistHandler } from '../../../services/wishlistService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import AddWishlist from '../add-wishlist/AddWishlist.js';

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
  const { showAlert } = useAlert();

  const columns = [
    new ListTableColumn('wishName', 'Product Name', 100),
    new ListTableColumn('link', 'Product Link', 200, true)
  ];

  const handleOnClickAddNewWishlist = () => {
    setOpenAddWishlist(true);
    setResetAddWishlistForm(true);
  };

  const handleCloseAddWishlist = () => {
    setResetAddWishlistForm(false);
    setOpenAddWishlist(false);
  }

  const actions = [
    {
      label: 'Add New Products',
      onClick: handleOnClickAddNewWishlist,
      disabled: false,
    }
  ];

  const userId = localStorage.getItem('userId');

  const getWishlist = async (userId) => {
    try {
      const response = await wishlistHandler(userId);
      setRows(response);
      return response;
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const refreshWishlist = async () => {
    if (!userId) return;
    await getWishlist(userId); // This fetches the latest wishlist data and updates `rows`.
  };

  useEffect(() => {
    if (userId) {
      getWishlist(userId)
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