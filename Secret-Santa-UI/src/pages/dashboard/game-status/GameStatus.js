import React, { useEffect, useState } from 'react'
import { isGameActiveHandler } from '../../../services/gameService.js';
import { useAlert } from '../../../services/context/AlertContext.js';
import { GAME_CODE_KEY } from '../../../constants/secretSantaConstants.js';
import { getGameUsers } from "../../../services/gameService.js";
import { ListTableColumn } from '../../../models/ListTableColumn.js';
import ListTable from '../../list-table/ListTable.js';

function GameStatus() {
  const [rows, setRows] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const { showAlert } = useAlert();

  const userId = localStorage.getItem('userId');
  const gameCode = localStorage.getItem(GAME_CODE_KEY);

  const isActive = async () => {
    try {
      const response = await isGameActiveHandler(gameCode);
      setIsGameActive(response.isActive === 1 ? true : false);
      return response;
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const columns = [
    new ListTableColumn('gameName', 'Game Name', 50),
    new ListTableColumn('userName', 'User', 50),
    new ListTableColumn('email', 'User Email', 100)
  ];

  const actions = [
    {
      label: 'START',
      onClick: () => {},
      disabled: isGameActive,
    },
    {
      label: 'END',
      onClick: () => {},
      disabled: !isGameActive,
    },
  ];

  const getGameInfo = async (gameCode) => {
    try {
      const response = await getGameUsers(gameCode);
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
      showAlert(error.message, 'error');
    }
  };

  useEffect(() => {
    if(userId) {
      getGameInfo(gameCode);
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