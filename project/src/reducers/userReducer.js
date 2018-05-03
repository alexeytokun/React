const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_SAVE_USERDATA":
            state = {
                ...state,
                userdata: action.payload
            };
            break;
        case "USER_SAVE_AVATAR":
            state = {
                ...state,
                avatar: action.payload
            };
            break;
        default:
            break;
    };
    return state;
};

export default userReducer;