module.exports = function (app) {
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
        res.sendStatus(200);
    }


    function findUser(req, res) {
        var query = req.query;
        if (query.username == true && query.password == true) {
            findUserByCredentials(req, res);
        } else if (query.username == true) {
            findUserByUsername(req, res);
        }
    }


    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var i in users) {
            if (users[i].username === username) {
                res.json(users[i]);
            }
        }
        return '0';
    }


    function findUserByCredentials(req, res) {
        var query = req.query;
        var username = query.username;
        var password = query.password;
        for (var i in users) {
            if (users[i].username === username && users[i].password === password) {
                res.json(users[i]);
            }
        }
        return '0';
    }


    function findUserById(req, res) {
        var userId = parseInt(req.params.userId);
        for (var u in users) {
            if (users[u]._id === userId) {
                res.json(users[u]);
            }
        }
        return '0';
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