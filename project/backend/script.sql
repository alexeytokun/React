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
    `password` CHAR(60) BINARY,
    `avatar` VARCHAR(30),
    PRIMARY KEY(`id`)
);

CREATE TABLE `lots` (
    `lot_id` INT(11) AUTO_INCREMENT,
    `lot_name` VARCHAR(30),
    `start_time` DATE,
    `end_time` DATE,
    `price` FLOAT(11),
    `image` VARCHAR(30),
    `description` VARCHAR(255),
    FOREIGN KEY(`user_id`)
        REFERENCES `users`(`id`),
    FOREIGN KEY(`category_id`)
        REFERENCES `categories`(`category_id`),
    PRIMARY KEY(`id`)
);

CREATE TABLE `categories` (
    `category_id` INT(11) AUTO_INCREMENT,
    `category_name` VARCHAR(30)
);

