import React, { useEffect, useState } from 'react'
import { startGame, endGame, isGameActiveHandler } from '../../../services/gameService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import { getGameUsers } from "../../../services/gameService.js";
import { ListTableColumn } from '../../../models/ListTableColumn.js';
import secretSantaTheme from '../../../assets/secretSantaTheme.jpg';
import Navbar  from '../../../components/navbar/Navbar.js';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import "./GameStatus.css"

function GameStatus() {
  const [rows, setRows] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const { showAlert } = useAlert();

  const userId = localStorage.getItem('userId');
  const gameId = localStorage.getItem('gameId');

  const isActive = async () => {
    try {
      const response = await isGameActiveHandler(gameId);
      setIsGameActive(response.isActive === 1 ? true : false);
      return response;
    } catch (error) {
      showAlert(error, 'error');
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
    } catch (error) {
      showAlert(error, 'error');
    }
  };

  const endSecretSantaGame = async () => {
    try {
      await endGame(gameId);
    } catch (error) {
      showAlert(error, 'error');
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
      if( response !== '' ) {
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
                  <div className="player-number">{index+1}</div>
                  <div className="player-name">
                    <strong>{player.userName}</strong>
                  </div>
                </div>
            </div>
          ))}
        </div>
        <div className="player-box" style={{marginTop: '5px'}}>
              <div className="player-item">
                <div className='player-shape'>
                  <div className="game-heading">
                      <strong>Total: {rows?.length}</strong>
                  </div>

                </div>
              </div>
        </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if(userId) {
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
      <Navbar/>
      <PlayerList players={rows} />

      </div>

      {/* <div class="list-item-box">
        <div class="list-item">
          <div class="player-number">1</div>
          <div class="player-name">Lorem <strong>IPSUM</strong></div>
        </div>
      </div> */}
    </div>
  )
}

export default GameStatus