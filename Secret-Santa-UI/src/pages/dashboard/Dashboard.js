import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./Dashboard.css"
import HostGame from '../host-game/HostGame';
import CodeDialog from '../shared/code/CodeDialog';
import { useNavigate } from "react-router-dom";
import { GAME_CODE_KEY } from '../../constants/secretSantaConstants';
import { joinGameHandler } from '../../services/gameService.js';
import { useAlert } from '../../services/context/AlertContext.js';

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateGame, setOpenCreateGame] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [openJoinGame, setOpenJoinGame] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [onSubmitHandler, setOnSubmitHandler] = useState(() => {});
  const { showAlert } = useAlert();
  const userId = localStorage.getItem('userId');

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
    if (localStorage.getItem(GAME_CODE_KEY)) {
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
    if (localStorage.getItem(GAME_CODE_KEY)) {
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
      const response = await joinGameHandler(userId, gameCode);
      showAlert('Joined Game Successfully!', 'success');
      return response;
    } catch (error) {
        throw error;
    }
  };

  const handleGameStatusSubmit = (gameCode) => {
    if (gameCode && gameCode.length === 8) {
      console.log('Fetching game status for code:', gameCode);
      alert('Game status fetched successfully!');
    } else {
      alert('Enter a valid Game Code');
    }
  };

  const handleCloseJoinGame = () => {
    setResetForm(false);
    setOpenJoinGame(false);
    navigate('/game');
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20231124/pngtree-happy-santa-claus-preparing-christmas-presents-merry-christmas-concept-background-image_15282600.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%'
  };

  return (
    <div style={backgroundStyle} className='dashboard'>
        <div><Navbar/></div>
        <div className="dashboard-container">
          <button className="game-actions" onClick={onClickCreateGame}>Host Game</button>
          <button className="game-actions" onClick={onClickJoinGame}>Join Game</button>
          <button className="game-actions" onClick={onClickGameStatus}>Game Status</button>
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