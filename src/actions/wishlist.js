export const addToWishlist = (id, info) => {
    return {
        type: "ADD_TO_WISHLIST",
        id: id,
        info: info
    };
};

export const removeFromWishlist = (id) => {
    return {
        type: "REMOVE_FROM_WISHLIST",
        id: id,
    };
};

export const clearWishlist = () => {
    return {
        type: "CLEAR_WISHLIST",
    };
};
