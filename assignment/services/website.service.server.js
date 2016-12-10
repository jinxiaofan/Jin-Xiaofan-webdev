module.exports = function(app, model) {
    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findALLWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        model.websiteModel.createWebsite(website)
            .then(
                function(newWebsite) {
                    res.send(newWebsite);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findALLWebsitesForUser(req, res) {
        var userId = req.params.uid;
        model.websiteModel.findALLWebsitesForUser(userId)
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
        var wid = req.params.wid;
        model.websiteModel.findWebsiteById(wid)
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


    function updateWebsite(req, res){
        var website = req.body;
        var wid = req.params.wid;
        model.websiteModel.updateWebsite(wid, website)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }



    function deleteWebsite(req,res){
        var wid = req.params.wid;
        model.websiteModel.deleteWebsite(wid)
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