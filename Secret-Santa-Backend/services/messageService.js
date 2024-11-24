const messageDao = require("../dao/messageDao");
const WebSocket = require("ws");

/**
 * Fetches messages for a specific user and game.
 *
 * @param {number} userId - ID of the user requesting messages.
 * @param {number} gameId - ID of the game.
 * @returns {Promise<{ secretSantaMessages: Array, giftNinjaMessages: Array }>} - A promise resolving to an object containing secretSantaMessages and giftNinjaMessages.
 */
const getMessagesForUserInGame = async (userId, gameId) => {
    try {
        const [secretSantaResults, giftNinjaResults] = await messageDao.getMessagesByUserAndGame(userId, gameId);

        const formatMessages = (messages) => messages.map((msg) => ({
            from: msg.from,
            content: msg.content,
        }));

        return {
            secretSantaMessages: formatMessages(secretSantaResults),
            giftNinjaMessages: formatMessages(giftNinjaResults),
        };
    } catch (error) {
        throw new Error(`Failed to fetch messages: ${error.message}`);
    }
};

/**
 * Saves a new message to the database.
 *
 * @param {number} userId - ID of the user sending the message.
 * @param {number} gameId - ID of the game where the message will be saved.
 * @param {string} chatBoxType - Type of the chat box (e.g., 'secretSanta' or 'giftNinja').
 * @param {string} content - The message content.
 * @returns {Promise<void>} - A promise indicating the message was saved successfully.
 */
const saveSenderMessage = async (userId, gameId, chatBoxType, content) => {
    try {
        const user = parseInt(userId, 10);
        const game = parseInt(gameId, 10);

        if (isNaN(user) || isNaN(game)) {
            throw new Error("Invalid userId or gameId.");
        }

        await messageDao.saveSenderMessage(content, user, game, chatBoxType);
        console.log("Message saved successfully!");
    } catch (error) {
        console.error("Error saving message to DB:", error);
        throw error;
    }
};

/**s
 * Sends a message to a specific user
 * @param {String} receiverId - The ID of the target user
 * @param {string} parsedMessage - The message object to send
 */
const sendMessageToUser = (receiverId, parsedMessage, connections) => {
    const ws = connections.get(receiverId.toString());
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(parsedMessage));
    } else {
        console.error(`Cannot send message. User ${receiverId} is not connected.`);
    }
};

/**
 * Handles incoming WebSocket messages
 * @param {String} userId - ID of the user who sent the message
 * @param {String} parsedMessage - Message object from the user
 */
const handleIncomingMessage = async (userId, parsedMessage) => {
    try {
        await saveSenderMessage(parsedMessage.userId, parsedMessage.gameId, parsedMessage.chatBoxType, parsedMessage.content);
        console.log(`Processing message from user ${userId}:`, parsedMessage);
    } catch (error) {
        console.error("Error parsing incoming message:", error);
    }
};

module.exports = { getMessagesForUserInGame, saveSenderMessage, handleIncomingMessage, sendMessageToUser };
