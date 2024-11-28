import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import "./Dashboard.css"
import HostGame from '../host-game/HostGame';
import CodeDialog from '../shared/code/CodeDialog';
import { useNavigate } from "react-router-dom";
import { GAME_CODE_KEY } from '../../constants/secretSantaConstants';

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateGame, setOpenCreateGame] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [openJoinGame, setOpenJoinGame] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const onClickCreateGame = () => {
    setResetForm(true);
    setOpenCreateGame(true);
  };
  const handleCloseCreateGame = () => {
    setResetForm(false);
    setOpenCreateGame(false);
  };

  const onClickJoinGame = () => {
    if (localStorage.getItem(GAME_CODE_KEY)) {
      navigate('/wishlist');
    } else {
      setResetForm(true);
      setButtonText('JOIN');
      setDialogTitle('Join Game');
      setOpenJoinGame(true);
    }
    
  };

  const onClickGameStatus = () => {
    if (localStorage.getItem(GAME_CODE_KEY)) {
      navigate('/wishlist'); // TO do will update the right navigation path later
    } else {
      setResetForm(true);
      setDialogTitle('Game Status');
      setButtonText('GET');
      setOpenJoinGame(true);
    }
  };

  const handleCloseJoinGame = () => {
    setResetForm(false);
    setOpenJoinGame(false);
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
        ></CodeDialog>
    </div>
  )
}

export default Dashboard