import axiosInstance from "./axionsInstance";

export const markEmailAsNotSentApi = async (userId, gameId, chatBoxType) => {
    try {
        const response = await axiosInstance.post('/api/chat/markEmailAsNotSent', {
            userId: userId,
            gameId: gameId,
            chatBoxType: chatBoxType
        })
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to mark email as not sent';
    }
};

export const fetchChatMessagesApi = async (userId, gameId) => {
    try {
        const response = await axiosInstance.post('/api/chat/getMessages', {
            userId: userId,
            gameId: gameId
        })
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to get chat messages';
    }
}

export const fetchPendingMessagesApi = async (userId, gameId) => {
    try {
        const response = await axiosInstance.post('/api/chat/getPendingMessages', {
            userId: userId,
            gameId: gameId
        })
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to get pending messages';
    }
}