import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import "./CodeDialog.css";
import { useNavigate } from "react-router-dom";
import { GAME_CODE_KEY } from '../../../constants/secretSantaConstants';

function CodeDialog({ open, onClose, buttonText, dialogTitle }) {

    const navigate = useNavigate();
    const [gameCode, setGameCode] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const GAME_CODE_REGEX = '^[a-zA-Z0-9]+$';

    const handleJoin = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if(gameCode && gameCode.length === 8 && gameCode.match(GAME_CODE_REGEX)) {
            localStorage.setItem(GAME_CODE_KEY, gameCode);
            navigate('/wishlist');
            onClose();
        } else {
            alert('Enter valid Game Code');
        }
    };

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason === 'backdropClick') {
                return;
            }
            onClose();
        }}
            maxWidth='sm'
            fullWidth 
            sx={{
                overflowX: 'hidden', 
            }}
        >
            <DialogTitle className="dialog-title">
                <Typography variant='h6' align='center' className='dialog-title-text'>
                    {dialogTitle}
                </Typography>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <form fullWidth onSubmit={handleJoin} className="code-form">
                    <TextField
                        label='Enter Game Code'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        value={gameCode}
                        onChange={(e) => setGameCode(e.target.value)}
                        error={submitted && gameCode}
                        helperText={submitted && !gameCode ? 'Game Code cannot be empty' : ''}
                        className='input-field'
                        inputProps={{ maxLength: 8 }}
                    ></TextField>
                    <DialogActions className='dialog-actions'>
                        <Button onClick={onClose} className='cancel-button'>CANCEL</Button>
                        <Button type='submit' className="join-button">{buttonText}</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CodeDialog