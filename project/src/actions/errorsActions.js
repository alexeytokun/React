export function saveError(err) {
    return {
        type: 'ERRORS_SAVE_ERROR',
        payload: err
    };
}

export function removeError() {
    return {
        type: 'ERRORS_REMOVE_ERROR'
    };
}