var express = require('express');
var router = express.Router();
const authenticate = require('../authentication/authenticated');
const db = require('../db');

router.use(authenticate);

/* GET home page. */
router.get('/', (request, response, next) => {
    const {id: userId}  = request.user;
    Promise.all([db.games.getGames(), db.players.findPlayerGames(userId)])
    .then ( ([games,rejoinableGames])  => response.render('lobby',{
                                              title: 'Lobby',
                                              user: request.user.username,
                                              games,
                                              rejoinableGames})
    )
    .catch( error => console.log(error));
});

module.exports = router;
