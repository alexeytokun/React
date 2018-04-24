var regex = require('./regex');

function validate(data) {
    var username = data.username;
    var firstname = data.firstname;
    var lastname = data.lastname;
    var email = data.email;
    var pass = data.pass;

    return regex.usernameRegex.test(String(username))
        && regex.firstnameRegex.test(String(firstname))
        && regex.lastnameRegex.test(String(lastname))
        && regex.emailRegex.test(String(email))
        && regex.passRegex.test(String(pass));
}

module.exports = validate;
