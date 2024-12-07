import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import Wishlist from '../../models/Wishlist';
import "./AddWishlist.css";
import { useAlert } from '../../context/AlertContext.js';
import { addWishToMineWishList } from '../../services/wishlistService.js';
import ErrorComponent from "../Error/ErrorComponent.js";

function AddWishlist({ open, onClose, resetForm, refreshWishlist }) {

    const [wishlistData, setWishlistData] = useState(new Wishlist());
    const [submitted, setSubmitted] = useState(true);
    const { showAlert } = useAlert();
    const [errorPopUp, setErrorPopUp] = useState({message: '', show: false});

    const handleAddWishlist = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        const userId = localStorage.getItem('userId');
        const gameId = localStorage.getItem('gameId');

        if (!userId) {
            showAlert('User is not logged In. Please log in to Host a Game.', 'error');
            return;
        }

        if (!gameId) {
            showAlert('Game is not created.', 'error');
            return;
        }

        if (wishlistData.productName && wishlistData.productLink) {
            await addProductToWishlist(userId, gameId, wishlistData);
            onClose();
            refreshWishlist();
        } else {
            showAlert('Please fill in all required fields', 'error');
        }
    };

    const addProductToWishlist = async (userId, gameId, wishlistData) => {
        try {
            const response = await addWishToMineWishList(userId, gameId, wishlistData);
            window.location.reload();
            showAlert('Product Added to Wishlist!', 'success');
            return response.data;
        } catch (error) {
            setErrorPopUp({message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true});
        }
    }

    const closeErrorPopUp = () => {
        setErrorPopUp({ message: '', show: false });
    }

    const handleInputChange = (field, value) => {
        setWishlistData((prev) => {
            const updatedWishlistData = new Wishlist(
                prev.productName,
                prev.productLink
            );
            updatedWishlistData[field] = value;
            return updatedWishlistData;
        })
    };

    useEffect(() => {
        if (resetForm) {
            setWishlistData(new Wishlist());
            setSubmitted(false);
        }
    }, [resetForm]);

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason === 'backdropClick') {
                return;
            }
            onClose();
        }}
            maxWidth='sm'>
            <DialogTitle className='dialog-title'>
                <Typography variant='body1' align='center' className='dialog-title-text'>
                    ADD WISHLIST
                </Typography>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <form className="add-wishlist-form" onSubmit={handleAddWishlist}>
                    <TextField
                        label='Product Name'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        value={wishlistData.productName}
                        onChange={(e) => handleInputChange('productName', e.target.value)}
                        error={submitted && !wishlistData.productName}
                        helperText={submitted && !wishlistData.productName ? 'Product Name is required' : ''}
                        className='input-field'
                    />
                    <TextField
                        label='Product Link'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        value={wishlistData.productLink}
                        onChange={(e) => handleInputChange('productLink', e.target.value)}
                        error={submitted && !wishlistData.productLink}
                        helperText={submitted && !wishlistData.productLink ? 'Product Link is required' : ''}
                        className='input-field'
                    />
                    <DialogActions className='dialog-actions'>
                        <Button onClick={onClose} className='cancel-button'>CANCEL</Button>
                        <Button type='submit' className="add-wishlist-button">ADD</Button>
                    </DialogActions>
                </form>
            </DialogContent>
            <ErrorComponent
                message={errorPopUp.message}
                show={errorPopUp.show}
                onClose={closeErrorPopUp}
            ></ErrorComponent>
        </Dialog>

    )
}

export default AddWishlist