module.exports = function(app,model) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice", lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",  lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  }
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    function createUser(req, res){
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function(error) {
                    res.sendStatus(400)
                        .send(error);
                }
            );
    }

    function findUser(req, res){
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req,res);
        } else if (query.username){
            findUserByUserName(req,res);
        }
    }

    function findUserByUserName(req, res){
        var username = req.query.username;
        model
            .userModel
            .findUserByUserName(username)
            .then(
                function (users) {
                    if (users) {
                        if(users[0]) {
                            res.json(users[0]);
                        }
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400)
                        .send(error);
                }
            )
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if (users) {
                        if (users[0]) {
                            res.json(users[0]);
                        } else{
                            res.send('0')
                        }
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400)
                        .send(error);
                }
            )

    }


    function findUserById(req, res){
        var userId = req.params.uid;
        model.userModel.findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400)
                        .send(error);
                }
            )
    }



    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.uid;
       model
           .userModel
           .updateUser(uid, user)
           .then(
               function(status){
                   res.sendStatus(200);
               },
               function(error) {
                   res.sendStatus(400)
                       .send(error);
               }
           )
    }

    function deleteUser(req,res){
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(error){
                  res.sendStatus(400)
                      .send(error);
                }
            )
    }
};

















