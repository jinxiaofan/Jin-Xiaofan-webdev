module.exports = function (app) {
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
    app.delete('/api/user/:userId', deleteUser);


    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
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
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                //res.json(users[u]);
                res.send(users[u]);
                return;
            }
        }
        //return '0';
        res.send('0');
    }


    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                //res.json(users[u]);
                res.send(users[u]);
                return;
            }
        }
        //return '0';
        res.send('0');
    }


    function findUserById(req, res) {
        var userId = parseInt(req.params.userId);
        for (var u in users) {
            if (users[u]._id === userId) {
                //res.json(users[u]);
                res.send(users[u]);
                return;
            }
        }
        //return '0';
        res.send('0');
    }


    function updateUser(req, res) {
        var userId = parseInt(req.params.userId);
        var user = req.body;
        for (var u = 0; u < users.length; u++) {
            if (users[u]._id === userId) {
                users[u] = user;
                break;
            }
        }
        res.sendStatus(200);
    }


    function deleteUser(req, res) {
        var userId = parseInt(req.params.userId);
        for (var u = 0; u < users.length; u++) {
            if (users[u]._id == userId) {
                users.slice(u, 1);
            }
        }
        res.sendStatus(200);
    }
};