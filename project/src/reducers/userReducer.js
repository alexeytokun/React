const initialState = { loggedIn: false };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_SAVE_USERDATA":
            state = {
                ...state,
                userdata: action.payload,
                loggedIn: action.payload ? true : false
            };
            break;
        case "USER_SAVE_AVATAR":
            state = {
                ...state,
                userdata: {
                    ...state.userdata,
                    avatar: action.payload
                }
            };
            break;
        case "USER_LOG_OUT":
            state = {
                ...state,
                userdata: {},
                loggedIn: false
            };
            break;
        default:
            break;
    };
    return state;
};

export default userReducer;