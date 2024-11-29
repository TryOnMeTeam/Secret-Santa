DROP PROCEDURE IF EXISTS `DeleteGameByGameId`;

CREATE PROCEDURE `DeleteGameByGameId`(IN pGameId INT)
BEGIN

    DELETE FROM games WHERE id = pGameId;

    DELETE FROM messages WHERE gameId = pGameId;

    DELETE FROM wishList WHERE gameId = pGameId;

    DELETE FROM userGame WHERE gameId = pGameId;

    DELETE FROM userEmailStatus WHERE gameId = pGameId;
END;