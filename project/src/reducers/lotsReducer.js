const initialState = { lots: {}, categories: {} };

const lotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOTS_SAVE_LOTS_AND_CATEGORIES":
            console.log(action.payload);
            state = {
                ...state,
                lots: action.payload.lots,
                categories: action.payload.categories
            };
            break;
        default:
            break;
    };
    return state;
};

export default lotsReducer;