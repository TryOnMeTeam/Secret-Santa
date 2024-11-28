import React, { useEffect, useState } from 'react';
import { ListTableColumn } from '../../../models/ListTableColumn';
import ListTable from '../../list-table/ListTable';
import { wishlistHandler } from '../../../services/wishlistService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import AddWishlist from '../add-wishlist/AddWishlist.js';

function JoinGame() {

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
    if(userId) {
      getWishlist(userId)
    }
  }, [userId]);

  return (
    <div style={{'padding-top': '4rem'}}>
      <ListTable columns={columns} rows={rows} actionButtons={actions} />

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