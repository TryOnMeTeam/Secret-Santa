const WebSocket = require("ws");
const url = require("url");
const messageService = require("../services/messageService");
const messageDao = require("../dao/messageDao");
const connections = new Map();

/**
 * Initializes WebSocket server and handles incoming connections
 * @param {Object} server - HTTP server to attach WebSocket server to
 */
const initializeSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws, req) => {
        const parsedUrl = url.parse(req.url, true);
        const userId = parsedUrl.query.userId;

        if (userId) {
            connections.set(userId, ws);

            ws.on("message", async (message) => {
                console.log(`Message received from ${userId}:`, message);
                const parsedMessage = JSON.parse(message);
                if (parsedMessage.type == 'message') {
                    const receiverId = await messageDao.getReceiverIdForSenderAndGame(
                        parsedMessage.userId, parsedMessage.gameId, parsedMessage.chatBoxType)
                    messageService.sendMessageToUser(receiverId, parsedMessage, connections);
                    await messageService.handleIncomingMessage(userId, parsedMessage);
                }
            });


            ws.on("close", () => {
                console.log(`User disconnected: ${userId}`);
                connections.delete(userId);
            });
        } else {
            console.error("Connection attempted without userId");
            ws.close();
        }
    });

    console.log("WebSocket server initialized");
};


module.exports = {
    initializeSocketServer,
};
