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
import Wishlist from '../../../models/Wishlist';
import "./AddWishlist.css";
import { useAlert } from '../../../services/context/AlertContext.js';
import { addProductToWishlistHandler } from '../../../services/wishlistService.js';

function AddWishlist({ open, onClose, resetForm, refreshWishlist }) {

    const [wishlistData, setWishlistData] = useState(new Wishlist());
    const [submitted, setSubmitted] = useState(true);
    const { showAlert } = useAlert();

    const handleAddWishlist = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        const userId = localStorage.getItem('userId');
        const gameId = localStorage.getItem('gameId');

        if(!userId) {
            showAlert('User is not logged In. Please log in to Host a Game.', 'error');
            return;
        }

        if(!gameId) {
            showAlert('Game is not created.', 'error');
            return;
        }
        
        if(wishlistData.productName && wishlistData.productLink) {
            await addProductToWishlist(userId, gameId, wishlistData);
            onClose();
            refreshWishlist();
        } else {
            showAlert('Please fill in all required fields');
        }
    };

    const addProductToWishlist = async (userId, gameId, wishlistData) => {
        try {
            const response = await addProductToWishlistHandler(userId, gameId, wishlistData);
            showAlert('Product Added to Wishlist!', 'success');
            return response.data;
        } catch (error) {
            showAlert(error, 'error');
        }
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
                <Typography variant='h6' align='center' className='dialog-title-text'>
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
        </Dialog>
    )
}

export default AddWishlist