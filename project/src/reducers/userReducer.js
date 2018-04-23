const initialState = {name: 'A'};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        default:
            break;
    };
    return state;
};

export default userReducer;