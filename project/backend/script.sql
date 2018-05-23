CREATE DATABASE project;
USE project;

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
    `lot_name` VARCHAR(255),
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

CREATE TABLE `lots_images` (
    `lot_image_id` INT(11) AUTO_INCREMENT,
    `lot_image_path` VARCHAR(255),
    `lot_id` INT(11),
    FOREIGN KEY(`lot_id`)
        REFERENCES `lots`(`lot_id`)
        ON DELETE CASCADE,
    PRIMARY KEY(`lot_image_id`)
);

CREATE TABLE `auctions` (
    `auction_id` INT(11) AUTO_INCREMENT,
    `lot_id` INT(11),
    `bidder_id` INT(11),
    `last_bid` FLOAT(11),
    `bids_count` INT(11) DEFAULT 0,
    FOREIGN KEY(`bidder_id`)
        REFERENCES `users`(`id`),
    FOREIGN KEY(`lot_id`)
        REFERENCES `lots`(`lot_id`)
        ON DELETE CASCADE,
    PRIMARY KEY(`auction_id`)
);

DELIMITER $$
DROP TRIGGER IF EXISTS project.lots_AFTER_INSERT$$
USE `project`$$
CREATE DEFINER = CURRENT_USER TRIGGER `project`.`lots_AFTER_INSERT` AFTER INSERT ON `lots` FOR EACH ROW
BEGIN
	INSERT INTO `auctions` (`lot_id`, `last_bid`) VALUES (NEW.lot_id, NEW.price);
END$$
DELIMITER ;

DELIMITER $$
DROP TRIGGER IF EXISTS project.lots_AFTER_UPDATE$$
USE `project`$$
CREATE DEFINER = CURRENT_USER TRIGGER `project`.`lots_AFTER_UPDATE` AFTER UPDATE ON `lots` FOR EACH ROW
BEGIN
	UPDATE `auctions` AS a SET `lot_id` = NEW.lot_id, `last_bid` = NEW.price WHERE a.lot_id = NEW.lot_id;
END$$
DELIMITER ;


INSERT INTO `categories` (`category_name`) VALUES ('Laptops');
INSERT INTO `categories` (`category_name`) VALUES ('Tablets');
INSERT INTO `categories` (`category_name`) VALUES ('Smartphones');
INSERT INTO `categories` (`category_name`) VALUES ('TVs');
INSERT INTO `categories` (`category_name`) VALUES ('TEST');


