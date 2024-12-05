import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./Dashboard.css"
import HostGame from '../host-game/HostGame';
import CodeDialog from '../shared/code/CodeDialog';
import { useNavigate } from "react-router-dom";
import { joinGameHandler, validateGameId } from '../../services/gameService.js';
import secretSantaTheme from '../../assets/secretSantaTheme.jpg';
import { IoIosCreate } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { MdFollowTheSigns } from "react-icons/md";


function Dashboard() {
  const navigate = useNavigate();

  const [openCreateGame, setOpenCreateGame] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [openJoinGame, setOpenJoinGame] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [onSubmitHandler, setOnSubmitHandler] = useState(() => { });
  const userId = localStorage.getItem('userId');
  const gameId = localStorage.getItem('gameId');

  useEffect(() => {
    checkAndValidateGameId();
  }, []);

  const checkAndValidateGameId = async () => {
    if (userId && gameId) {
      try {
        const response = await validateGameId(gameId);
        if (!response) {
          localStorage.removeItem('gameId');
        }
      } catch (error) {
        throw(error);
      }
    }
  };

  const onClickCreateGame = () => {
    setResetForm(true);
    setOpenCreateGame(true);
  };
  const handleCloseCreateGame = () => {
    setResetForm(false);
    setOpenCreateGame(false);
  };

  const onClickJoinGame = () => {
    setResetForm(true);
    if (localStorage.getItem('gameId')) {
      navigate('/game');
    } else {
      setOnSubmitHandler(() => handleJoinGameSubmit);
      setButtonText('JOIN');
      setDialogTitle('Join Game');
      setOpenJoinGame(true);
    }
  };

  const onClickGameStatus = () => {
    setResetForm(true);
    if (localStorage.getItem('gameId')) {
      navigate('/gameStatus');
    } else {
      setOnSubmitHandler(() => handleGameStatusSubmit);
      setDialogTitle('Game Status');
      setButtonText('GET');
      setOpenJoinGame(true);
    }
  };

  const handleJoinGameSubmit = async (gameCode) => {
    try {
      return await joinGameHandler(userId, gameCode);
    } catch (error) {
      throw error;
    }
  };

  const handleGameStatusSubmit = async (gameCode) => {
    try {
      return await joinGameHandler(userId, gameCode);
    } catch (error) {
      throw error;
    }
  };

  const handleCloseJoinGame = () => {
    setResetForm(false);
    setOpenJoinGame(false);
    navigate('/secret-santa');
  };

  const backgroundStyle = {
    backgroundImage: `url(${secretSantaTheme})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%'
  };

  return (
    <div style={backgroundStyle} className='dashboard'>
      <div><Navbar /></div>
      <div className="dashboard-container">
        <button className="game-home-actions" onClick={onClickCreateGame}><IoIosCreate />Host Game</button>
        <button className="game-home-actions" onClick={onClickJoinGame}><MdFollowTheSigns />Enter Game</button>
        <button className="game-home-actions" onClick={onClickGameStatus}><CiViewList />Game Status</button>
      </div>
      <HostGame open={openCreateGame} onClose={handleCloseCreateGame} resetForm={resetForm}></HostGame>
      <CodeDialog
        open={openJoinGame}
        onClose={handleCloseJoinGame}
        buttonText={buttonText}
        dialogTitle={dialogTitle}
        onSubmit={onSubmitHandler}
        resetForm={resetForm}
      ></CodeDialog>
    </div>
  )
}

export default Dashboard