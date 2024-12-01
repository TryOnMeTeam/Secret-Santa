import axiosInstance from "./axionsInstance";

export const hostGameHandler = async (userId, payload) => {
    try{
        const response = await axiosInstance.post('/api/game/createGame', {
            userId,
            payload
        });

        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to Host Game';
    }
};

export const joinGameHandler = async (userId, gameCode) => {
    try {
        const response = await axiosInstance.post('/api/game/joinuser', {
            userId,
            gameCode
        });
        if(response.data?.data) {
            localStorage.setItem('gameId', response.data?.data);
        }

        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to Join the game';
    }
};

export const isGameActiveHandler = async (gameId) => {
    try {
        const response = await axiosInstance.get(`/api/game/isActive/${gameId}`);
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to fetch if game is Active';
    }
};

export const getGameUsers = async (gameId) => {
    try {
        const response = await axiosInstance.get(`/api/game/gameinfo/${gameId}`);
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to fetch Game Info';
    }
};

export const startGame = async (gameId) => {
    try {
        const response = await axiosInstance.post(`/api/game/startGame`, {
            gameId
        });
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to start Game';
    }
};

export const exitGame = async (userId, gameId) => {
    try {
        const response = await axiosInstance.post(`/api/game/exit`, {
            userId,
            gameId
        });
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to exit Game';
    }
};

export const endGame = async (gameId) => {
    try {
        const response = await axiosInstance.delete(`/api/game/endGame/${gameId}`);
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to end Game';
    }
};

export const validateGameId = async (gameId) => {
    try {
        const response = await axiosInstance.post(`/api/game/validateGame`, {
            gameId
        });
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to validate Game';
    }
};
