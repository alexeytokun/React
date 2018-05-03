export function saveUserdata(userdata) {
    return {
        type: 'USER_SAVE_USERDATA',
        payload: userdata
    };
}

export function saveUserAvatar(img) {
    return {
        type: 'USER_SAVE_AVATAR',
        payload: img
    };
}