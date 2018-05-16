const initialState = { error: null };

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ERRORS_SAVE_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "ERRORS_REMOVE_ERROR":
            state = {
                ...state,
                error: null
            };
            break;
        default:
            break;
    };
    return state;
};

export default errorsReducer;