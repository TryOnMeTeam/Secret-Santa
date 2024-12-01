import React, { useEffect, useState } from 'react'
import { startGame, endGame, isGameActiveHandler } from '../../../services/gameService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import { getGameUsers } from "../../../services/gameService.js";
import { ListTableColumn } from '../../../models/ListTableColumn.js';
import ListTable from '../../list-table/ListTable.js';

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

  useEffect(() => {
    if(userId) {
      getGameInfo(gameId);
      isActive();
    }
  }, [userId]);

  return (
    <div>
      <ListTable
        columns={columns}
        rows={rows}
        actionButtons={actions}
      />
    </div>
  )
}

export default GameStatus