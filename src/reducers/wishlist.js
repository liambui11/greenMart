const wishlistReducer = (state = [], action) => {
    let newState = [...state];

    switch (action.type) {
        case "ADD_TO_WISHLIST":
            // Kiểm tra xem sản phẩm đã có trong wishlist chưa
            if (state.some((item) => item.id === action.id)) {
                return state; // Nếu đã có thì không thêm nữa
            }
            return [
                ...state,
                {
                    id: action.id,
                    info: action.info,
                },
            ];

        case "REMOVE_FROM_WISHLIST":
            newState = newState.filter((item) => item.id !== action.id);
            return newState;

        case "CLEAR_WISHLIST":
            return [];

        default:
            return state;
    }
};

export default wishlistReducer;
