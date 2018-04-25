CREATE DATABASE project;
USE project;

CREATE TABLE `tokens` (
    `id` INT(11) AUTO_INCREMENT,
    `uuid` VARCHAR(40),
    `timestamp` BIGINT(15),
    PRIMARY KEY(`id`)
);

CREATE TABLE `users` (
    `id` INT(11) AUTO_INCREMENT,
    `username` VARCHAR(30) COLLATE utf8_bin,
    `firstname` VARCHAR(30),
    `lastname` VARCHAR(30),
    `email` VARCHAR(40),
    `role` VARCHAR(15) DEFAULT 'user',
    `password` VARCHAR(15),
    PRIMARY KEY(`id`)
);


