var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/', function(request, response, next){
  const username = request.body['username'];
  const email = request.body['email'];
  const password = request.body['password'];
  bcrypt.hash(password, 10, (error,hashedPass) => {
    db.users.createUser(username,email,hashedPass)
      .then( (successMsg) =>  {
                                response.sendStatus(200);
                              }

      ).catch( (rejectMsg) => {
                                response.sendStatus(405);
                              }
      )
  })

})

module.exports = router;
