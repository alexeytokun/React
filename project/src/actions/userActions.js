export function saveUserdata(userdata) {
    return {
        type: 'USER_SAVE_USERDATA',
        payload: userdata
    };
}