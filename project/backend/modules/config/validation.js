const regex = require('./regex');

const validate = {};

validate.user = (data, flag) => {
    const {username, firstname, lastname, email, pass} = data;
    const userRegex = regex.user;

    if (flag) {
        return userRegex.usernameRegex.test(String(username))
            && userRegex.firstnameRegex.test(String(firstname))
            && userRegex.lastnameRegex.test(String(lastname))
            && userRegex.emailRegex.test(String(email))
    }

    return userRegex.usernameRegex.test(String(username))
        && userRegex.firstnameRegex.test(String(firstname))
        && userRegex.lastnameRegex.test(String(lastname))
        && userRegex.emailRegex.test(String(email))
        && userRegex.passRegex.test(String(pass));
};

validate.lot = (data) => {
    const {lotname, start, end, price, description, category, userid} = data;
    const lotRegex = regex.lot;

    return lotRegex.lotname.test(String(lotname))
        && lotRegex.start.test(String(start))
        && lotRegex.end.test(String(end))
        && lotRegex.price.test(String(price))
        && lotRegex.description.test(String(description))
        && lotRegex.category.test(String(category))
        && lotRegex.userid.test(String(userid))
};

module.exports = validate;