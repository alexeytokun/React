const regex = {};

regex.usernameRegex = /^[а-яА-ЯёЁa-zA-Z0-9_-]{1,30}$/;
regex.firstnameRegex = /^[а-яА-ЯёЁa-zA-Z-]{1,30}$/;
regex.lastnameRegex = /^[а-яА-ЯёЁa-zA-Z-]{1,30}$/;
regex.emailRegex = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
regex.passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;

module.exports = regex;
