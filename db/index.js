const pgp = require('pg-promise')();
const connection = pgp(process.env.DATABASE_URL);

exports = module.exports;
exports.users = require('./users/')(connection);
exports.games = require('./games/')(connection);
exports.players = require('./players/')(connection);
