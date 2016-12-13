module.exports = function(app,model) {
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var passport = require('passport');

    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    app.use(session({
        secret: "this is a secret",
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
    app.get("/api/loggedIn", loggedIn);

    app.put("/api/user/:userId/follow", addFollow);
    app.put("/api/user/:userId/unfollow", unFollow);

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    function addFollow(req, res) {
        var userId = req.params.uid;
        var followUser = req.body;
        model.userModel
            .addFollow(userId, followUser._id)
            .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(400).send(error);
                });
    }

    function unFollow(req, res) {
        var userId = req.params.uid;
        var followUser = req.body;
        model.userModel
            .unFollow(userId, followUser._id)
            .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(400).send(error);
                });
    }




    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function loggedIn(req, res) {
        if (req.isAuthenticated())
            res.json(req.user);
        else
            res.send('0');
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        model.userModel.findUserByUserName(username)
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


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }



    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
        model.userModel.findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    function createUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel.createUser(user)
            .then(
                function(newUser) {
                    if(newUser){
                        req.login(newUser, function(err) {
                            if(err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(newUser);
                            }
                        });
                    }
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
        model.userModel.findUserByUserName(username)
            .then(
                function (user) {
                    if (user) {
                        if(user) {
                            res.json(user);
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


    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        model.userModel.findUserByCredentials(username, password)
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
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.uid;
        model.userModel.updateUser(uid, user)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteUser(req,res){
        var uid = req.params.uid;
        model.userModel.deleteUser(uid)
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