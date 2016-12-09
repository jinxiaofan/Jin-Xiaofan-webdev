module.exports = function(app, model) {
    var websites = [
        {_id: "123", name: "Facebook", developerId: "456"},
        {_id: "234", name: "Tweeter", developerId: "456"},
        {_id: "456", name: "Gizmodo", developerId: "456"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123"},
        {_id: "678", name: "Checkers", developerId: "123"},
        {_id: "789", name: "Chess", developerId: "234"}
    ];


    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findALLWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        model
            .websiteModel
            .createWebsite(website)
            .then(
                function(newWebsite) {
                    res.send(newWebsite);
                },
                function(error) {
                    res.sendStatus(400)
                        .send(error);
                }
            );

    }

    function findALLWebsitesForUser(req, res) {
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
                    res.sendStatus(400)
                        .send(error);
                }
            )
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    if(website){
                        res.json(website);
                    }
                },
                function (error) {
                    res.sendStatus(400)
                        .send(error);
                }
            )
    }


    function updateWebsite(req, res){
        var website = req.body;
        var wid = req.params.wid;
        model
            .websiteModel
            .updateWebsite(wid, website)
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



    function deleteWebsite(req,res){
        var wid = req.params.wid;
        model
            .websiteModel
            .deleteWebsite(wid)
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