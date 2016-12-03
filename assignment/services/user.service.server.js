module.exports = function (app,model) {
    console.log("hello from user service server");

    var session = require('express-session');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var bcrypt = require("bcrypt-nodejs");
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', unregisterUser);



    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        model.
        userModel
            .findUserByUserName(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, '0');
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


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