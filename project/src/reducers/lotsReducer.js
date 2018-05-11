const initialState = { lots: null, categories: null };

const lotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOTS_SAVE_LOTS_AND_CATEGORIES":
            state = {
                ...state,
                lots: action.payload.lots,
                categories: action.payload.categories,
                sortedLots: action.payload.sortedLots
            };
            break;
        default:
            break;
    };
    return state;
};

export default lotsReducer;