// let user = JSON.parse(localStorage.getItem('user'));

const initialState = {};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            state = {
                ...state,
                loggedIn: false,
                user: action.user
            };
            return state;
        case 'LOGIN_SUCCESS':
            state = {
                ...state,
                loggedIn: true,
                user: action.user
            };
            return state;
        case 'LOGIN_FAILURE':
            return {};
        case 'LOGOUT':
            return {};
        default:
            return state;
    };
};

export default authenticationReducer;