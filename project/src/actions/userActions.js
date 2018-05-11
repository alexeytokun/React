export function saveUserdata(userdata) {
    return {
        type: 'USER_SAVE_USERDATA',
        payload: userdata
    };
}

export function saveUserAvatar(src) {
    return {
        type: 'USER_SAVE_AVATAR',
        payload: src
    };
}

export function userLogOut() {
    return {
        type: "USER_LOG_OUT",
        payload: ''
    };
}

export function saveUsernames(names) {
    return {
        type: "USER_SAVE_USERNAMES",
        payload: names
    };
}