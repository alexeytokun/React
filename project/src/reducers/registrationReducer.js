const initialState = {};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            state = {
                ...state,
                registering: true,
                registering_data: action.payload
            };
            return state;
        case 'REGISTER_SUCCESS':
            return {};
        case 'REGISTER_FAILURE':
            return {};
        default:
            return state;
    };
    return state;
};

export default registrationReducer;