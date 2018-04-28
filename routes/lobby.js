var express = require('express');
var router = express.Router();
const authenticate = require('../authentication/authenticated');

router.use(authenticate);

var user;

/* GET home page. */
router.get('/', function(request, response, next) {
            console.log(request.user);
            user = request.user;
            response.render('lobby', {title: 'Express'});
});

module.exports = router;
