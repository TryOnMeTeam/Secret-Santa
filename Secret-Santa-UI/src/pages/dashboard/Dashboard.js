import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import "./Dashboard.css"
import HostGame from '../host-game/HostGame';
import CodeDialog from '../shared/code/CodeDialog';

function Dashboard() {

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
    setResetForm(true);
    setButtonText('JOIN');
    setDialogTitle('Join Game');
    setOpenJoinGame(true);
  };

  const onClickGameStatus = () => {
    setResetForm(true);
    setDialogTitle('Game Status');
    setButtonText('GET');
    setOpenJoinGame(true);
  };

  const handleCloseJoinGame = () => {
    setResetForm(false);
    setOpenJoinGame(false);
  };

  return (
    <div className='dashboard'>
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