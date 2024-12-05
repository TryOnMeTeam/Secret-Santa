const schedule = require('node-schedule');
const gameDao = require('../dao/GameDao');
const gameService = require('../service/GameService');
const rule = new schedule.RecurrenceRule();
rule.hour = [0, new schedule.Range(0, 0, 0)];

const autoStartOrEndGame = async () => {
    const gameIdsToStart = await gameDao.getGameIdsForStartByScheduler();
    for (const gameId of gameIdsToStart) {
        await gameService.startSecretSantaGame(gameId);
    }

    const gameIdsToEnd = await gameDao.getGameIdsForEndByScheduler();
    for (const gameId of gameIdsToEnd) {
        await gameService.endGameAndDeleteData(gameId);
    }
}

function start() {
    schedule.scheduleJob(rule, () => {
        autoStartOrEndGame();
    });
}

start();