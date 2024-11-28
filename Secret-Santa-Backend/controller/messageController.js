const messageService = require('../services/messageService');

/**
 * Retrieve all messages for a specific user and game.
 *
 * @route POST /api/chat/getMessages
 * @example
 * Request Body:
 * {
 *   "userId": 123,
 *   "gameId": 456
 * }
 *
 * Response:
 * [
 *   {
 *     "messageId": 1,
 *     "userId": 123,
 *     "gameId": 456,
 *     "content": "Hello!",
 *     "timestamp": "2024-11-24T10:00:00Z"
 *   },
 *   ...
 * ]
 */
const getMessagesForUserInGame = async (req, res) => {
    const { userId, gameId } = req.body;

    if (!userId || !gameId) {
        return res.status(400).json({ error: 'User ID and Game ID are required.' });
    }

    try {
        const messages = await messageService.fetchMessagesForUserInGame(userId, gameId);
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
};

/**
 * Retrieve pending messages for a specific user and game.
 *
 * @route POST /api/chat/getPendingMessages
 * @example
 * Request Body:
 * {
 *   "userId": 123,
 *   "gameId": 456
 * }
 *
 * Response:
 * [
 *   {
 *     "messageId": 1,
 *     "userId": 123,
 *     "gameId": 456,
 *     "content": "You have pending messages.",
 *     "timestamp": "2024-11-24T10:15:00Z"
 *   },
 *   ...
 * ]
 */
const getPendingMessagesForUserInGame = async (req, res) => {
    const { userId, gameId } = req.body;

    if (!userId || !gameId) {
        return res.status(400).json({ error: 'User ID and Game ID are required.' });
    }

    try {
        const pendingMessages = await messageService.getPendingMessagesForUserInGame(userId, gameId);
        return res.status(200).json(pendingMessages);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve pending messages.' });
    }
};

/**
 * Mark email notifications as unsent for a specific user, game, and chat type.
 *
 * @route POST /api/chat/markEmailAsUnsent
 * @example
 * Request Body:
 * {
 *   "userId": 123,
 *   "gameId": 456,
 *   "chatBoxType": "support"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Email marked as unsent."
 * }
 */
const markEmailAsNotSent = async (req, res) => {
    const { userId, gameId, chatBoxType } = req.body;

    if (!userId || !gameId || !chatBoxType) {
        return res.status(400).json({ error: 'User ID, Game ID, and Chat Box Type are required.' });
    }

    try {
        const result = await messageService.markEmailAsNotSent(userId, gameId, chatBoxType);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update email status.' });
    }
};

module.exports = {
    getMessagesForUserInGame,
    getPendingMessagesForUserInGame,
    markEmailAsNotSent
};
