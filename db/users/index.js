module.exports = function(db){
    const userFunctions = {};

    userFunctions.createUser = (username,email,password) => {
        return new Promise(
            function(resolve,reject){
              db.none('INSERT INTO "users"'
                      +'(username,email,password) VALUES  ($1,$2,$3)',
                        [username,email,password])
              .then( () => resolve('Account successfully created'))
              .catch( error => reject('Username or email already exists!'));
            }
          )
    }

    userFunctions.findByUsername = (username) => {
      return db.one('SELECT id,username,email,password'+
              ' FROM "users" WHERE UPPER(username) = UPPER($1)',[username]);
    }

    userFunctions.checkUser = (username, password) => {
        return new Promise(
        function(resolve,reject){
          db.one('SELECT id FROM "users"'
                  +' WHERE username = $1 AND password = $2',
                  [username,password])
          .then( userid => resolve(userid))
          .catch( error => reject(error) )
        }
      )
    }

    userFunctions.findByUserId = (userid) => {
      return new Promise(
        function(resolve,reject){
          db.one('SELECT username,email,id'
                +' FROM "users" WHERE id = $1',[userid])
          .then( data => resolve(data))
          .catch( error => reject(error))
        }
      )
    }

    return userFunctions;
}
