import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import "./HostGame.css";
import Game from "../../models/Game";
import { hostGameHandler } from "../../services/gameService.js";
import { useAlert } from './../../services/context/AlertContext.js';


function HostGame({ open, onClose, resetForm }) {
    const [gameData, setGameData] = useState(new Game());
    const [submitted, setSubmitted] = useState(false);
    const { showAlert } = useAlert();

    const handleInputChange = (field, value) => {
        setGameData((prev) => {
            const updatedGameDate = new Game(
                prev.gameName,
                prev.startDate,
                prev.endDate,
                prev.maxPlayers
            );
            updatedGameDate[field] = value;
            return updatedGameDate;
        })
    };

    useEffect(() => {
        if(resetForm) {
            setGameData(new Game());
            setSubmitted(false);
        }
    }, [resetForm]);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const handleCreate = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        const userId = localStorage.getItem('userId');

        if(!userId) {
            showAlert('User is not logged In. Please log in to Host a Game.', 'error');
            return;
        }

        if (gameData.gameName && gameData.startDate && gameData.endDate && gameData.maxPlayers) {
            if(!gameData.isValidStartDate()) {
                showAlert('Start date must be tomorrow or later');
                return;
            }
            if(!gameData.isValidEndDate()) {
                showAlert('End Date must be after the start date');
                return;
            }
            if(!gameData.maxPlayers >= 2) {
                showAlert('Maximum members cannot be less than 2');
                return;
            }

            const formattedGameData = {
                ...gameData,
                startDate: gameData.startDate.toISOString().split('T')[0],
                endDate: gameData.endDate.toISOString().split('T')[0]
            };

            const payload = {
                userId,
                formattedGameData
            }
            await hostGame(payload);
            onClose();

        } else {
            showAlert("Please fill in all required fields");
        }
    };

    const hostGame = async (payload) => {
        try {
            const response = await hostGameHandler(payload.userId, payload.formattedGameData);
            showAlert('Game Hosted!', 'success');
            return response;
        } catch (error) {
            showAlert(error, 'error');
        }
    }

    return (
        <Dialog open={open} onClose={(event, reason) => {
                if( reason === 'backdropClick' ) {
                    return;
                }
                onClose();
            }}
            maxWidth="sm">
            <DialogTitle className="dialog-title">
                <Typography variant="h6" align="center" className="dialog-title-text">
                    Host Game
                </Typography>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <form onSubmit={handleCreate} className="host-game-form">
                    <TextField
                        label="Game Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={gameData.gameName}
                        onChange={(e) => handleInputChange('gameName', e.target.value)}
                        error={submitted && !gameData.gameName}
                        helperText={submitted && !gameData.gameName ? "Game name is required" : ""}
                        className="input-field"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="MM/dd/yyyy"
                                value={gameData.startDate}
                                onChange={(date) => {
                                    handleInputChange('startDate', date);
                                    handleInputChange('endDate', null);
                                }}
                                minDate={tomorrow}
                                className="date-picker-wrapper"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
                                        error={submitted && !gameData.startDate}
                                        helperText={
                                            submitted && !gameData.startDate
                                                ? "Start Date is required"
                                                : ""
                                        }
                                        className="date-picker-input"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/dd/yyyy"
                                value={gameData.endDate}
                                onChange={(date) => handleInputChange('endDate', date)}
                                className="date-picker-wrapper"
                                minDate={gameData.startDate || tomorrow}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
                                        error={submitted && !gameData.endDate}
                                        helperText={
                                            submitted && !gameData.endDate
                                                ? "End Date is required"
                                                : ""
                                        }
                                        className="date-picker-input"
                                    />
                                )}
                            />
                        </div>
                    </LocalizationProvider>
                    <TextField
                        label="Maximum Players"
                        type="number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={gameData.maxPlayers}
                        onChange={(e) => handleInputChange('maxPlayers', e.target.value)}
                        error={submitted && !gameData.maxPlayers}
                        helperText={
                            submitted && !gameData.maxPlayers
                                ? "Maximum Players are required"
                                : ""
                        }
                        className="input-field"
                    />
                    <DialogActions className="dialog-actions">
                        <Button onClick={onClose} className="cancel-button">
                            CANCEL
                        </Button>
                        <Button type="submit" className="create-button">
                            HOST
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default HostGame;
