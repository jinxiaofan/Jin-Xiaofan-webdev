module.exports = function(app,model) {
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var passport = require('passport');

    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

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

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.get("/api/user", getUsers);

    app.post("/api/upload", upload.single('avatarFile'), uploadImage);


    function uploadImage(req, res) {

        var myFile = req.file;
        var uid = req.body.uid;

        if (myFile) {

            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            model.userModel
                .updateAvatar(uid, "/uploads/" + filename)
                .then(function (stat) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.status(400).send(error);
                    });
        }
        res.redirect("/project/#/user/" + uid);
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

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
};