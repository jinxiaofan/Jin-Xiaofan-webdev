module.exports = function(app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findALLPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);


    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.sendStatus(200);
    }


    function findALLPagesForWebsite(req, res) {
        var result = [];
        var wid = req.params.wid;
        for (var w in pages) {
            if (pages[w].websiteId === wid) {
                result.push(pages[w])
            }
        }
        res.json(result);
    }


    function findPageById(req, res) {
        var pid = req.params.pid;
        for (var w in pages) {
            if (pages[w]._id === pid) {
                res.json(pages[w]);
            }
        }
    }



    function updatePage(req, res){
        var page = req.body;
        var pid = req.params.pid;
        for (var w in pages) {
            if (pages[w]._id === pid) {
                pages[w] = page;
                break;
            }
        }
        res.sendStatus(200);
    }



    function deletePage(req,res){
        var pid = req.params.pid;
        for (var w in pages) {
            if (pages[w]._id === pid) {
                pages.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }
};