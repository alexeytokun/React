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
    `avatar` VARCHAR(255),
    PRIMARY KEY(`id`)
);

CREATE TABLE `categories` (
    `category_id` INT(11) AUTO_INCREMENT,
    `category_name` VARCHAR(30),
    PRIMARY KEY(`category_id`)
);

CREATE TABLE `lots` (
    `lot_id` INT(11) AUTO_INCREMENT,
    `lot_name` VARCHAR(45),
    `start_time` DATETIME,
    `end_time` DATETIME,
    `price` FLOAT(11),
    `image` VARCHAR(255),
    `description` VARCHAR(255),
    `user_id` INT(11),
    `category_id` INT(11),
    FOREIGN KEY(`user_id`)
        REFERENCES `users`(`id`),
    FOREIGN KEY(`category_id`)
        REFERENCES `categories`(`category_id`),
    PRIMARY KEY(`lot_id`)
);

INSERT INTO `categories` (`category_name`) VALUES ('Category 1');
INSERT INTO `categories` (`category_name`) VALUES ('Category 2');
INSERT INTO `categories` (`category_name`) VALUES ('Category 3');


