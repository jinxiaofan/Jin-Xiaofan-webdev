module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findALLWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.sendStatus(200);
    }

    function findALLWebsitesForUser(req, res) {
        var result = [];
        var userId = req.params.uid;
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                result.push(websites[w])
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        for (var w in websites) {
            if (websites[w]._id === wid) {
                res.json(websites[w]);
            }
        }
    }


    function updateWebsite(req, res){
        var website = req.body;
        var wid = req.params.wid;
        for (var w in websites) {
            if (websites[w]._id === wid) {
                websites[w] = website;
                break;
            }
        }
        res.sendStatus(200);
    }



    function deleteWebsite(req,res){
        var wid = req.params.wid;
        for (var w in websites) {
            if (websites[w]._id === wid) {
                websites.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }

};

