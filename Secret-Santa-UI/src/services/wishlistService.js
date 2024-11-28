import axiosInstance from "./axionsInstance";

export const wishlistHandler = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/user/wishlist/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Failed to fetch Wishlist';
    }
};

export const addProductToWishlistHandler = async (userId, gameCode, payload) => {
    try {
        const response = await axiosInstance.post('/api/user/createwishlist', {
            userId,
            gameCode,
            payload
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Failed to Add Product to Wishlist';
    }
}