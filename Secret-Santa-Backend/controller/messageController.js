const messageService = require("../services/messageService");

/**
 * POST /api/chat/getMessages
 *
 * Fetch messages for a specific user and game.
 * @example
 * POST /api/chat/getMessages
 *
 * Request Body:
 * {
 *   "userId": 123,
 *   "gameId": 456
 * }
 *
 * [
 *   {
 *     "messageId": 1,
 *     "userId": 123,
 *     "gameId": 456,
 *     "content": "Hello!",
 *     "timestamp": "2024-11-24T10:00:00Z"
 *   },
 *   {
 *     "messageId": 2,
 *     "userId": 123,
 *     "gameId": 456,
 *     "content": "How are you?",
 *     "timestamp": "2024-11-24T10:05:00Z"
 *   }
 * ]
 */
const getMessagesForUserInGame = async (req, res) => {
    const { userId, gameId } = req.body;

    if (!userId || !gameId) {
        return res.status(400).json({ error: "userId and gameId are required." });
    }

    try {
        const messages = await messageService.getMessagesForUserInGame(userId, gameId);
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch messages." });
    }
};

module.exports = { getMessagesForUserInGame };
