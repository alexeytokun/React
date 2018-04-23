const initialState = {location: 'Login'};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOCATION_CHANGE":
            state = {
                ...state,
                location: action.payload
            };
            return state;
        default:
            return state;
    };
};

export default locationReducer;