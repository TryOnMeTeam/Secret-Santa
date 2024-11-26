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