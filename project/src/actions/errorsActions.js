export function saveError(err) {
    return {
        type: 'ERRORS_SAVE_ERROR',
        payload: err
    };
}

export function removeError() {
    return {
        type: 'LOTS_SAVE_LOTS_AND_CATEGORIES'
    };
}