const errorsObj = require('../config/errors');
const pool = require('../config/connection').pool;
const SERVER_URL = require('../config/constants').SERVER_URL;

const query = (sql, props) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection((err, connection) => {
            if (err) {
                reject({ status: 409, message: errorsObj.DB_CON });
                return;
            }
            connection.query(
                sql, props,
                (error, result) => {
                    if (error) reject({ status: 409, message: errorsObj.DB_QUERY });
                    else resolve(result);
                }
            );
            connection.release();
        });
    });
};

const lotsDB = {};

lotsDB.getCategories = () => {
    const sql = 'SELECT `category_id`, `category_name` FROM `categories`';
    const prop = '';
    return query(sql, prop);
};

lotsDB.getLotData = (id) => {
    const sql = 'SELECT l.lot_id, l.lot_name, l.start_time, l.end_time, l.price AS starting_price, a.last_bid AS price,' +
        ' l.description, l.user_id, l.category_id, u.username FROM `lots` AS l LEFT JOIN `users` AS u ON ' +
        'l.user_id = u.id LEFT JOIN `auctions` AS a ON l.lot_id = a.lot_id WHERE l.lot_id= ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.getLotImages = (id) => {
    const sql = 'SELECT CONCAT("' + SERVER_URL + '", l.lot_image_path) AS image, l.lot_id, l.lot_image_id AS image_id' +
        ' FROM `lots_images` AS l WHERE l.lot_id= ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.getAllLots = () => {
    const sql = 'SELECT l.lot_id, l.lot_name, l.start_time, l.end_time, l.price AS starting_price, a.last_bid AS price,' +
        ' l.description, l.user_id, l.category_id, u.username FROM' +
        ' `lots` AS l LEFT JOIN `users` AS u ON l.user_id = u.id LEFT JOIN `auctions` AS a ON l.lot_id = a.lot_id';
    const prop = '';
    return query(sql, prop);
};

lotsDB.getWonLots = (id) => {
    const sql = 'SELECT l.lot_id FROM `lots` AS l LEFT JOIN `users` AS u ON l.user_id = u.id LEFT JOIN `auctions`' +
        ' AS a ON l.lot_id = a.lot_id WHERE a.bidder_id = ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.getAllLotsImages = () => {
    const sql = 'SELECT CONCAT("' + SERVER_URL + '", l.lot_image_path) AS image, l.lot_id, l.lot_image_id AS image_id' +
        ' FROM `lots_images` AS l';
    const prop = '';
    return query(sql, prop);
};

lotsDB.addLotToDb = lotData => {
    const sql = 'INSERT INTO `lots` (`lot_name`, `start_time`, `end_time`, `price`, `description`,' +
        ' `category_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const prop = [lotData.lotname, lotData.start, lotData.end, lotData.price, lotData.description,
        lotData.category, lotData.userid];
    return query(sql, prop);
};

lotsDB.addLotImages = (pathesArray, id) => {
    let lot_img = [];
    for (let i = 0; i < pathesArray.length; i++) {
        lot_img.push([
            pathesArray[i],
            id
            ]);
    }
    const sql = 'INSERT INTO `lots_images` (`lot_image_path`, `lot_id`) VALUES ?';
    const prop = [lot_img];
    return query(sql, prop);
};

lotsDB.deleteLotImage = (id) => {
    const sql = 'DELETE FROM lots_images WHERE lot_image_id = ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.deleteLot = (id) => {
    const sql = 'DELETE FROM lots WHERE lot_id = ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.updateLotData = (lotData, id) => {
    const prop =  [lotData.lotname, lotData.start, lotData.end, lotData.price, lotData.description,
            lotData.category, lotData.userid, id];
    const sql = 'UPDATE `lots` SET `lot_name`=?, `start_time`=?, `end_time`=?, `price`=?, `description`=?, ' +
        ' `category_id`=?, `user_id`=? WHERE `lot_id` = ?';
    return query(sql, prop);
};

lotsDB.getAuctionData = id => {
    const sql = 'SELECT a.last_bid, u.username AS bidder FROM `auctions` AS a LEFT JOIN `users` AS u ON a.bidder_id = u.id WHERE a.lot_id = ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.updateAuctionData = data => {
    const sql = 'UPDATE `auctions` SET `last_bid`=?, `bidder_id`=? WHERE `lot_id` = ?';
    const prop = [data.bid, data.buyer, data.lot_id];
    return query(sql, prop);
};

lotsDB.getComments = id => {
    const sql = 'SELECT c.comment_id, c.user_id, c.post_time, c.post_text, c.reply, CONCAT("' + SERVER_URL
        + '", u.avatar) AS avatar, u.username FROM `comments` AS c LEFT JOIN `users` AS u' +
        ' ON c.user_id = u.id WHERE c.lot_id = ?';
    const prop = [id];
    return query(sql, prop);
};

lotsDB.addComment = (comment) => {
    const sql = 'INSERT INTO `comments` (`lot_id`, `user_id`, `post_text`, `post_time`, `reply`)' +
        ' VALUES (?, ?, ?, ?, ?)';
    const prop = [comment.lot_id, comment.user_id, comment.post_text, comment.post_time, comment.reply];
    return query(sql, prop);
};

lotsDB.editComment = (comment, id) => {
    const sql = 'UPDATE `comments` SET `post_text`=?, `post_time`=? WHERE `comment_id`=?';
    const prop = [comment.post_text, comment.post_time, id];
    console.log('here');
    console.log(prop);
    return query(sql, prop);
};

module.exports = lotsDB;