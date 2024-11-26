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

function CodeDialog({ open, onClose, buttonText, dialogTitle }) {
    const [gameCode, setGameCode] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleJoin = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if(gameCode) {
            alert('Joined');
            onClose();
        } else {
            alert('Please correct the errors');
        }
    };

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason === 'backdropClick') {
                return;
            }
            onClose();
        }}
            maxWidth='sm'>
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