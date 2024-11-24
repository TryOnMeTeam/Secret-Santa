const db = require("../config/db");

/**
 * Fetch messages for a specific user and game.
 * @param {number} userId - The ID of the user.
 * @param {number} gameId - The ID of the game.
 * @returns {Promise<Array|null>} - Returns an array of messages or null if there is an error.
 */
const getMessagesByUserAndGame = async (userId, gameId) => {
    try {
        const results = await db.query("CALL GetMessages(?, ?)", [parseInt(userId, 10), parseInt(gameId, 10)]);
        return results[0] ?? null;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
};

/**
 * Save a new message to the database.
 * @param {string} content - The content of the message.
 * @param {number} userId - The ID of the user sending the message.
 * @param {number} gameId - The ID of the game.
 * @param {string} chatBoxType - The type of chat box ('secretSanta' or 'giftNinja').
 * @returns {Promise<boolean>} - Returns true if the message was successfully saved, otherwise false.
 */
const saveSenderMessage = async (content, userId, gameId, chatBoxType) => {
    try {
        const results = await db.query('CALL InsertMessage(?, ?, ?, ?)', [content, userId, gameId, chatBoxType]);
        return results[0] ? true : false;
    } catch (error) {
        console.error("Error saving message:", error);
        return false;
    }
};


/**
 * Fetches the receiver ID for a given sender, game, and chat box type.
 *
 * @param {number} senderId - ID of the sender.
 * @param {number} gameId - ID of the game.
 * @param {string} chatBoxType - Type of the chat box (e.g., 'secretSanta' or 'giftNinja').
 * @returns {Promise<number|null>} - A promise resolving to the receiverId or null if not found.
 */
const getReceiverIdForSenderAndGame = async (senderId, gameId, chatBoxType) => {
    try {
        let query = '';

        if (chatBoxType === 'secretSanta') {
            query = 'SELECT secretSantaId AS receiverId FROM User_Game WHERE userId = ? AND gameId = ? LIMIT 1';
        } else if (chatBoxType === 'giftNinja') {
            query = 'SELECT giftNinjaId AS receiverId FROM User_Game WHERE userId = ? AND gameId = ? LIMIT 1';
        } else {
            throw new Error("Invalid chatBoxType.");
        }

        const result = await db.query(query, [senderId, gameId]);

        return result[0] ? result[0][0].receiverId : null;
    } catch (error) {
        console.error("Error fetching receiverId:", error);
        return null;
    }
};

module.exports = { getMessagesByUserAndGame, saveSenderMessage, getReceiverIdForSenderAndGame };
