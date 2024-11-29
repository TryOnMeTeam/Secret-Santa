import axiosInstance from "./axionsInstance";

export const wishlistHandler = async (userId, gameId) => {
    try {
        const response = await axiosInstance.get(`/api/user/wishlist?userId=${userId}&gameId=${gameId}`);
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to fetch Wishlist';
    }
};

export const addProductToWishlistHandler = async (userId, gameId, payload) => {
    try {
        const response = await axiosInstance.post('/api/user/createwishlist', {
            userId,
            gameId,
            payload
        });
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to Add Product to Wishlist';
    }
}

export const getWishlistByUserAndGame = async (userId, gameCode) => {
    try {
        const response = await axiosInstance.get(`/api/user/wishlist?userId=${userId}&gameCode=${gameCode}`);
        return response.data?.data;
    } catch (error) {
        throw error.response ? error.response.data?.data : 'Failed to fetch Wishlist';
    }
}