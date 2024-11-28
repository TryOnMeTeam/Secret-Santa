const messageDao = require("../dao/messageDao");
const emailService = require("../services/emailService.js");
const WebSocket = require("ws");

/**
 * Retrieves messages for a specific user in a given game.
 *
 * @param {number} userId - The ID of the user requesting the messages.
 * @param {number} gameId - The ID of the game for which messages are retrieved.
 * @returns {object} - An object containing secretSantaMessages and giftNinjaMessages arrays.
 */
const fetchMessagesForUserInGame = async (userId, gameId) => {
    try {
        const [secretSantaMessages, giftNinjaMessages] = await messageDao.getMessagesByUserAndGame(userId, gameId);

        const formatMessages = (messages) => messages.map((msg) => ({
            from: msg.from,
            content: msg.content,
        }));

        return {
            secretSantaMessages: formatMessages(secretSantaMessages),
            giftNinjaMessages: formatMessages(giftNinjaMessages),
        };
    } catch (error) {
        throw new Error(`Failed to fetch messages: ${error.message}`);
    }
};

/**
 * Saves a new message sent by a user for a specific game and chat box type.
 *
 * @param {number} userId - The ID of the user sending the message.
 * @param {number} gameId - The ID of the game where the message will be saved.
 * @param {string} chatBoxType - Type of chat box ('secretSanta' or 'giftNinja').
 * @param {string} messageContent - The content of the message.
 * @returns {void}
 */
const storeSentMessage = async (userId, gameId, chatBoxType, messageContent) => {
    try {
        const user = parseInt(userId, 10);
        const game = parseInt(gameId, 10);

        if (isNaN(user) || isNaN(game)) {
            throw new Error("Invalid userId or gameId.");
        }

        await messageDao.saveSenderMessage(messageContent, user, game, chatBoxType);
        console.log("Message saved successfully!");
    } catch (error) {
        console.error("Error saving message to DB:", error);
        throw error;
    }
};

/**
 * Sends a message to a specific user through WebSocket or email if the user is not connected.
 *
 * @param {string} receiverId - The ID of the user receiving the message.
 * @param {object} messageData - The message object to send.
 * @param {Map} connections - A map of WebSocket connections indexed by user IDs.
 * @returns {void}
 */
const dispatchMessageToUser = async (receiverId, messageData, connections) => {
    const webSocket = connections.get(receiverId?.toString());
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(messageData));
    } else {
        sendEmailNotificationToUser(receiverId, messageData);
        console.error(`Cannot send message. User ${receiverId} is not connected.`);
    }
};

/**
 * Handles an incoming message from a user, saving it to the database.
 *
 * @param {string} senderId - ID of the user sending the message.
 * @param {object} messageData - The message object from the user.
 * @returns {void}
 */
const processIncomingMessage = async (senderId, messageData) => {
    try {
        storeSentMessage(messageData.userId, messageData.gameId, messageData.chatBoxType, messageData.content);
        console.log(`Message processed from user ${senderId}:`, messageData);
    } catch (error) {
        console.error("Error processing incoming message:", error);
    }
};

/**
 * Retrieves pending messages for a user in a given game.
 *
 * @param {number} userId - The ID of the user requesting the pending messages.
 * @param {number} gameId - The ID of the game for which pending messages are retrieved.
 * @returns {object} - An object indicating if there are pending messages for 'secretSanta' and 'giftNinja' chat boxes.
 */
const getPendingMessagesForUserInGame = async (userId, gameId) => {
    try {
        const result = await messageDao.getPendingMessagesForUserInGame(userId, gameId);

        return {
            secretSantaPendingMessages: Boolean(result?.secretSantaPendingMessages),
            giftNinjaPendingMessages: Boolean(result?.giftNinjaPendingMessages),
        };
    } catch (error) {
        throw new Error(`Failed to fetch pending messages: ${error.message}`);
    }
};

/**
 * Sends an email notification to a user if a message cannot be delivered via WebSocket.
 *
 * @param {string} receiverId - The ID of the user receiving the email.
 * @param {object} messageData - The message object to send in the email.
 * @returns {void}
 */
const sendEmailNotificationToUser = async (receiverId, messageData) => {
    const emailAlreadySent = await hasEmailAlreadyBeenSent(receiverId, messageData);
    if (!emailAlreadySent) {
        // await emailService.sendEmail(
        //     "sharmaShivam1909@gmail.com",
        //     "ok",
        //     generateEmailTemplate()
        // );
        messageDao.upsertUserEmailStatusForGame(receiverId, messageData.gameId, messageData.chatBoxType);
    }
};

/**
 * Checks if an email notification has already been sent to a user.
 *
 * @param {string} receiverId - The ID of the user receiving the email.
 * @param {object} messageData - The message object associated with the email.
 * @returns {boolean} - Returns true if an email has been sent, false otherwise.
 */
const hasEmailAlreadyBeenSent = async (receiverId, messageData) => {
    const result = await messageDao.isEmailAlreadySent(receiverId, messageData.gameId, messageData.chatBoxType);
    return result.isEmailAlreadySent === true;
};

/**
 * Marks an email as not sent for a specific user, game, and chat box type.
 *
 * @param {string} userId - The ID of the user.
 * @param {number} gameId - The ID of the game.
 * @param {string} chatBoxType - The type of chat box ('secretSanta' or 'giftNinja').
 * @returns {void}
 */
const markEmailAsNotSent = async (userId, gameId, chatBoxType) => {
    await messageDao.markEmailAsNotSent(userId, gameId, chatBoxType);
};

/**
 * Generates the HTML content for the email notification.
 *
 * @returns {string} - The HTML string representing the email template.
 */
const generateEmailTemplate = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
        <div class="rules">
            <h3>message aaya h check krle time ho to</h3>
        </div>
    </body>
    </html>
    `;
};

module.exports = {
    fetchMessagesForUserInGame,
    storeSentMessage,
    dispatchMessageToUser,
    processIncomingMessage,
    getPendingMessagesForUserInGame,
    sendEmailNotificationToUser,
    hasEmailAlreadyBeenSent,
    markEmailAsNotSent,
};
