import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./Dashboard.css"
import HostGame from '../../components/HostGame/HostGame';
import CodeDialog from '../../components/CodeDialog/CodeDialog';
import { useNavigate } from "react-router-dom";
import { joinGameHandler, validateGameId } from '../../services/gameService.js';
import * as Constant from '../../constants/secretSantaConstants.js';
import secretSantaTheme from '../../assets/secretSantaTheme.jpg';
import { IoIosCreate } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { MdFollowTheSigns } from "react-icons/md";
import ErrorComponent from '../../components/Error/ErrorComponent.js';


function Dashboard() {
  const navigate = useNavigate();

  const [openCreateGame, setOpenCreateGame] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [openJoinGame, setOpenJoinGame] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [onSubmitHandler, setOnSubmitHandler] = useState(() => { });
  const [errorPopUp, setErrorPopUp] = useState({message: '', show: false});
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
      navigate(Constant.ROUTE_PATH.GAME);
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
      navigate(Constant.ROUTE_PATH.GAME_STATUS);
    } else {
      setOnSubmitHandler(() => handleGameStatusSubmit);
      setDialogTitle('Game Status');
      setButtonText('GET');
      setOpenJoinGame(true);
    }
  };

  const handleJoinGameSubmit = async (gameCode) => {
    try {
      const response = await joinGameHandler(userId, gameCode);
      if (response) {
        return {gameId: response, path: Constant.ROUTE_PATH.GAME};
      }
    } catch (error) {
      throw error;
    }
  };

  const handleGameStatusSubmit = async (gameCode) => {
    try {
      const response =  await joinGameHandler(userId, gameCode);
      if (response) {
        return {gameId: response, path: Constant.ROUTE_PATH.GAME_STATUS};
      } else {
        setErrorPopUp({ message: Constant.POPUP_ERROR_MESSAGE, show: true });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCloseJoinGame = () => {
    setResetForm(false);
    setOpenJoinGame(false);
    navigate(Constant.ROUTE_PATH.DASHBOARD);
  };

  const closeErrorPopUp = () => {
    setErrorPopUp({ message: Constant.EMPTY, show: false });
  }

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

      <ErrorComponent
        message={errorPopUp.message}
        show={errorPopUp.show}
        onClose={closeErrorPopUp}
      ></ErrorComponent>
    </div>
  )
}

export default Dashboard