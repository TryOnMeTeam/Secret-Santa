DROP PROCEDURE IF EXISTS `GetMessages`;

CREATE PROCEDURE `GetMessages`(IN userId INT, IN gameId INT)
BEGIN
    -- Fetch secretSantaId and giftNinjaId, ensuring only one row is returned
    SELECT secretSantaId, giftNinjaId
    INTO @secretSantaId, @giftNinjaId
    FROM User_Game
    WHERE userId = userId AND gameId = gameId
    LIMIT 1;

    -- Fetch Secret Santa messages, ordered by time
    SELECT
        CASE
            WHEN senderId = userId and recieverId = @secretSantaId THEN 'Me'
            WHEN senderId = @secretSantaId and recieverId = userId THEN 'Santa'
        END AS 'from',
        content,
        `time`
    FROM Message
    WHERE ((senderId = @secretSantaId AND recieverId = userId)
    OR (senderId = userId AND recieverId = @secretSantaId))
    AND gameId = gameId
    ORDER BY `time`;

    -- Fetch Gift Ninja messages, ordered by time
    SELECT
        CASE
            WHEN senderId = userId and recieverId = @giftNinjaId THEN 'Me'
            WHEN senderId = @giftNinjaId and recieverId = userId THEN 'Ninja'
        END AS 'from',
        content,
        `time`
    FROM Message
    WHERE ((senderId = @giftNinjaId AND recieverId = userId)
    OR (senderId = userId AND recieverId = @giftNinjaId))
    AND gameId = gameId
    ORDER BY `time`;
END