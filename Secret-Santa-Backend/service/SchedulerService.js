const schedule = require('node-schedule');
const gameDao = require('../dao/GameDao');
const gameService = require('../service/GameService');

const autoStartOrEndGame = async () => {
    const gameIdsToStart = gameDao.getGameIdsForStartByScheduler();
    for (const gameId of gameIdsToStart) {
        await gameService.startSecretSantaGame(gameId);
    }

    const gameIdsToEnd = gameDao.getGameIdsForEndByScheduler();
    for (const gameId of gameIdsToEnd) {
        await gameService.endGameAndDeleteData(gameId);
    }
}

const job = schedule.scheduleJob('0 0 * * *', () => {
    const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    if (istDate.getHours() === 0) {
        autoStartOrEndGame();
    }
});

