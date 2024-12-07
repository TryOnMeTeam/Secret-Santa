import React, { useEffect, useState } from 'react'
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
import { useAlert } from '../../context/AlertContext.js';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from "../Error/ErrorComponent.js";

function CodeDialog({ open, onClose, buttonText, dialogTitle, onSubmit, resetForm }) {

    const navigate = useNavigate();
    const [gameCode, setGameCode] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { showAlert } = useAlert();
    const [errorPopUp, setErrorPopUp] = useState({ message: '', show: false });

    const GAME_CODE_REGEX = '^[a-zA-Z0-9]+$';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (gameCode && gameCode.length === 8 && gameCode.match(GAME_CODE_REGEX)) {
            try {
                const response = await onSubmit(gameCode);
                if (response.gameId) {
                    localStorage.setItem('gameId', response.gameId);
                    showAlert('Joined Game Successfully!', 'success');
                    navigate(response.path);
                }
                else {
                    alert('Enter valid Game Code here');
                }
            } catch (error) {
                setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
            }
        } else {
            alert('Enter valid Game Code there');
        }
    };

    const closeErrorPopUp = () => {
        setErrorPopUp({ message: '', show: false });
    }

    useEffect(() => {
        setGameCode('');
        setSubmitted(false);
    }, [resetForm]);

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
            <DialogTitle className="dialog-title-code">
                <Typography variant='h6' align='center' className='dialog-title-text-code'>
                    {dialogTitle}
                </Typography>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <form fullWidth onSubmit={handleSubmit} className="code-form">
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
            <ErrorComponent
                message={errorPopUp.message}
                show={errorPopUp.show}
                onClose={closeErrorPopUp}
            ></ErrorComponent>
        </Dialog>
    )
}

export default CodeDialog