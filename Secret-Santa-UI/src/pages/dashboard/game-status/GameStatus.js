import React, { useEffect, useState } from 'react'
import { startGame, endGame, isGameActiveHandler } from '../../../services/gameService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import { getGameUsers, exitGame } from "../../../services/gameService.js";
import { ListTableColumn } from '../../../models/ListTableColumn.js';
import { useNavigate } from "react-router-dom";
import secretSantaTheme from '../../../assets/secretSantaTheme.jpg';
import Navbar from '../../../components/navbar/Navbar.js';
import { FaStopCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import ErrorComponent from "../../../components/Error/ErrorComponent.js";
import "./GameStatus.css"

function GameStatus() {
  const [rows, setRows] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [errorPopUp, setErrorPopUp] = useState({ message: '', show: false });

  const userId = localStorage.getItem('userId');
  const gameId = localStorage.getItem('gameId');

  const isActive = async () => {
    try {
      const response = await isGameActiveHandler(gameId);
      setIsGameActive(response.isActive === 1 ? true : false);
      return response;
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const columns = [
    new ListTableColumn('gameName', 'Game Name', 50),
    new ListTableColumn('userName', 'User', 50),
    new ListTableColumn('email', 'User Email', 100)
  ];

  const startSecretSantaGame = async () => {
    try {
      await startGame(gameId);
      window.location.reload();
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const endSecretSantaGame = async () => {
    try {
      await endGame(gameId);
      localStorage.removeItem('gameId')
      navigate('/secret-santa');
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const actions = [
    {
      label: 'START',
      onClick: startSecretSantaGame,
      disabled: isGameActive,
    },
    {
      label: 'END',
      onClick: endSecretSantaGame,
      disabled: isGameActive,
    },
  ];

  const getGameInfo = async (gameId) => {
    try {
      const response = await getGameUsers(gameId);
      if (response !== '') {
        const filteredResponse = response.map(({ gameName, userName, email }) => ({
          gameName,
          userName,
          email
        }));
        setRows(filteredResponse);
      } else {
        setRows([]);
      }
      return response;
    } catch (error) {
      showAlert(error, 'error');
    }
  };

  const onClickExitGame = async () => {
    try {
      await exitGame(userId, gameId);
      navigate('/secret-santa');
      localStorage.removeItem('gameId')
    } catch (error) {
      setErrorPopUp({ message: error ? error : 'Something unexpected happened. Please contact your administrator', show: true });
    }
  };

  const closeErrorPopUp = () => {
    setErrorPopUp({ message: '', show: false });
  }


  const PlayerList = ({ players }) => {
    return (
      <div className='status' >
        <div className='status-body'>
          <div className="game-box">
            <div className="game-head">
              <div className="game-heading">
                <strong>🎅 {rows[0]?.gameName} 🎁</strong>
              </div>
            </div>
          </div>
          <div className="player-box">
            <div className="player-item">
              <div className='player-shape'>
                <div className="game-heading">
                  <strong>Players</strong>
                </div>

              </div>
            </div>
          </div>
          <div className='fixed'>

            {players.map((player, index) => (
              <div className="list-item-box">
                <div className="list-item" key={index}>
                  <div className="player-number">{index + 1}</div>
                  <div className="player-name">
                    <strong>{player.userName}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="player-box" style={{ marginTop: '5px' }}>
            <div className="player-item">
              <div className='player-shape'>
                <div className="game-heading">
                  <strong>Total: {rows?.length}</strong>
                </div>

              </div>
            </div>
          </div>
          <div className='game-action-container'>
            <button className="game-actions" style={{ width: '252px' }} onClick={endSecretSantaGame}> <FaStopCircle /> End Game</button>
            <button className="game-actions" style={{ width: '252px' }} onClick={startSecretSantaGame}> <FaPlay /> Start Game</button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (userId) {
      getGameInfo(gameId);
      isActive();
    }
  }, [userId]);

  const backgroundStyle = {
    backgroundImage: `url(${secretSantaTheme})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
  };

  return (
    <div style={backgroundStyle} >
      <div>
        <Navbar />
        <PlayerList players={rows} />
        <button className="exit-game-button" onClick={onClickExitGame}>
          <ImExit /> Exit Game
        </button>
      </div>
      <ErrorComponent
        message={errorPopUp.message}
        show={errorPopUp.show}
        onClose={closeErrorPopUp}
      ></ErrorComponent>
    </div>
  )
}

export default GameStatus