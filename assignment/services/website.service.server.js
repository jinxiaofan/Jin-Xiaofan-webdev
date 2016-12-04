module.exports = function (app,model) {
    // var websites = [
    //     { _id: 123, name: "Facebook",    developerId: 456 , description: "I am facebook!"},
    //     { _id: 234, name: "Tweeter",     developerId: 456, description: "I am tweeter!" },
    //     { _id: 456, name: "Gizmodo",     developerId: 456, description: "I am gizmdo!" },
    //     { _id: 567, name: "Tic Tac Toe", developerId: 123, description: "I am tic tac toe!" },
    //     { _id: 678, name: "Checkers",    developerId: 123, description: "I am checkers!" },
    //     { _id: 789, name: "Chess",       developerId: 234, description: "I am chess!" }
    // ];


    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);


    function createWebsite(req, res) {
        // var website = req.body;
        // websites.push(website);
        // res.send(200);
        var website = req.body;
        model
            .websiteModel
            .createWebsite(website)
            .then(
                function(newWebsite) {
                    res.send(newWebsite);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findAllWebsitesForUser(req, res) {
        // var userId = req.params.userId;
        // var result = [];
        // for (var w in websites) {
        //     if (websites[w].developerId == userId) {
        //         result.push(websites[w]);
        //     }
        // }
        // res.json(result);
        // //res.send(result);
        var userId = req.params.uid;
        model
            .websiteModel
            .findALLWebsitesForUser(userId)
            .then(
                function (websites) {
                    if (websites) {
                        res.json(websites);
                    } else {
                        res.json([])
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findWebsiteById(req, res) {
        // var websiteId = parseInt(req.params.websiteId);
        // for (var w in websites) {
        //     if (websites[w]._id === websiteId) {
        //         res.json(websites[w]);
        //     }
        // }
        // return '0';
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website){
                    if(website){
                        res.json(website);
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWebsite(req, res) {
        // var website = req.body;
        // var websiteId = parseInt(req.params.websiteId);
        // for (var w in websites) {
        //     if (websites[w]._id === websiteId) {
        //         websites[w] = website;
        //         break;
        //     }
        // }
        // res.sendStatus(200);
        var website = req.body;
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteWebsite(req, res) {
        // var websiteId = parseInt(req.params.websiteId);
        // for (var i = 0; i < websites.length; i++) {
        //     if (websites[i]._id === websiteId) {
        //         websites.splice(i, 1);
        //     }
        // }
        // res.sendStatus(200);
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(websiteId)
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