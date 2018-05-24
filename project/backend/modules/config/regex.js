const regex = {};

regex.user = {};
regex.user.usernameRegex = /^[а-яА-ЯёЁa-zA-Z0-9_-]{1,30}$/;
regex.user.firstnameRegex = /^[а-яА-ЯёЁa-zA-Z-]{1,30}$/;
regex.user.lastnameRegex = /^[а-яА-ЯёЁa-zA-Z-]{1,30}$/;
regex.user.emailRegex = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
regex.user.passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;

regex.lot = {};
regex.lot.lotname = /^(?=.*\w)[0-9а-яА-ЯёЁa-zA-Z-.'"?!:;,() ]{1,255}$/;
regex.lot.start =/^([0-9]{4})-([0-1][0-9])-([0-3][0-9])( [0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;
regex.lot.end = /^([0-9]{4})-([0-1][0-9])-([0-3][0-9])( [0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;
regex.lot.price = /^(\d+\.\d{1,2})$/;
regex.lot.description = /^[\w а-яА-ЯёЁ()+.'"?!:;,-]*$/;
regex.lot.category = /^[0-9]{1,3}$/;
regex.lot.userid = /^[0-9]{1,9}$/;

module.exports = regex;
