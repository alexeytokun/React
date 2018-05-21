const regex = require('./regex');

const validate = (data, flag) => {
    const username = data.username;
    const firstname = data.firstname;
    const lastname = data.lastname;
    const email = data.email;
    const pass = data.pass;

    if (flag) {
        return regex.usernameRegex.test(String(username))
            && regex.firstnameRegex.test(String(firstname))
            && regex.lastnameRegex.test(String(lastname))
            && regex.emailRegex.test(String(email))
    }

    return regex.usernameRegex.test(String(username))
        && regex.firstnameRegex.test(String(firstname))
        && regex.lastnameRegex.test(String(lastname))
        && regex.emailRegex.test(String(email))
        && regex.passRegex.test(String(pass));
};

module.exports = validate;