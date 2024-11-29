import axiosInstance from "./axionsInstance";

export const hostGameHandler = async (userId, payload) => {
    try{
        const response = await axiosInstance.post('/api/game/createGame', {
            userId,
            payload
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Failed to Host Game';
    }
};

export const joinGameHandler = async (userId, gameCode) => {
    try {
        const response = await axiosInstance.post('/api/game/joinuser', {
            userId,
            gameCode
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Failed to Join the game';
    }
};

export const isGameActiveHandler = async (gameCode) => {
    try {
        const response = await axiosInstance.get(`/api/game/isActive/${gameCode}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Failed to fetch if game is Active';
    }
};

export const getGameUsers = async (gameCode) => {
    try {
        const response = await axiosInstance.get(`/api/game/gameinfo/${gameCode}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Failed to fetch Game Info';
    }
};