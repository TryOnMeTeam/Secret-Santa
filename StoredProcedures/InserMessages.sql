DROP PROCEDURE IF EXISTS `InsertMessage`;

CREATE PROCEDURE `InsertMessage`(
    IN p_content TEXT,
    IN p_senderId INT,
    IN p_gameId INT,
    IN p_chatBoxType VARCHAR(50)
)
BEGIN
    DECLARE receiverId INT;

    -- Fetch receiverId based on chatBoxType
    IF p_chatBoxType = 'secretSanta' THEN
        -- Fetch secretSantaId from User_Game table where userId and gameId match
        SELECT secretSantaId
        INTO receiverId
        FROM User_Game
        WHERE userId = p_senderId AND gameId = p_gameId;

    ELSEIF p_chatBoxType = 'giftNinja' THEN
        -- Fetch giftNinjaId from User_Game table where userId and gameId match
        SELECT giftNinjaId
        INTO receiverId
        FROM User_Game
        WHERE userId = p_senderId AND gameId = p_gameId;

    END IF;

    -- Insert the message into the Message table with the current time
    INSERT INTO Message (content, senderId, recieverId, gameId, time)
    VALUES (p_content, p_senderId, receiverId, p_gameId, NOW());

END