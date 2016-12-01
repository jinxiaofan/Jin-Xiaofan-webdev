module.exports = function (app,model) {
    console.log("hello from user service server");
    var users = [
        {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"},
        {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@gmail.com"},
        {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@gmail.com"},
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com"}
    ];


    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', unregisterUser);


    function createUser(req, res) {
        // var user = req.body;
        // user._id = (new Date()).getTime();
        // users.push(user);
        // res.send(user);
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUser(req, res) {
        var query = req.query;
        if (query.username && query.password) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }


    function findUserByUsername(req, res) {
        // var username = req.query.username;
        // for (var u in users) {
        //     if (users[u].username === username) {
        //         //res.json(users[u]);
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // //return '0';
        // res.send('0');
        var username = req.query.username;
        model
            .userModel
            .findUserByUserName(username)
            .then(
                function (users) {
                    if (users) {
                        if(users[0]) {
                            res.json(users[0]);
                        } else {
                            res.send('0');
                        }
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function findUserByCredentials(req, res) {
        // var username = req.query.username;
        // var password = req.query.password;
        // for (var u in users) {
        //     if (users[u].username === username && users[u].password === password) {
        //         //res.json(users[u]);
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // //return '0';
        // res.send('0');
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
                    res.sendStatus(400).send(error);
                }
            )
    }


    function findUserById(req, res) {
        // var userId = parseInt(req.params.userId);
        // for (var u in users) {
        //     if (users[u]._id === userId) {
        //         //res.json(users[u]);
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // //return '0';
        // res.send('0');
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
                    res.sendStatus(400).send(error);
                }
            )
    }


    function updateUser(req, res) {
        // var userId = parseInt(req.params.userId);
        // var user = req.body;
        // for (var u in users) {
        //     if (users[u]._id === userId) {
        //         users[u] = user;
        //         break;
        //     }
        // }
        // res.send(200);
        var user = req.body;
        var userId = req.params.userId;
        model
            .userModel
            .updateUser(userId, user)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function unregisterUser(req, res) {
        // var userId = parseInt(req.params.userId);
        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users.slice(u, 1);
        //     }
        // }
        // res.send(200);
        var userId = req.params.userId;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }
};