module.exports = function (app,model) {

    // var pages = [
    //     { _id: 321, name: "Post 1", websiteId: 456 },
    //     { _id: 432, name: "Post 2", websiteId: 456 },
    //     { _id: 543, name: "Post 3", websiteId: 456 }
    // ];
    //

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/page/:pageId', findPageById);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);



    function createPage(req, res) {
        //var websiteId = parseInt(req.params.websiteId);
        //var page = req.body;
        // page._id = (new Date()).getTime();
        // page.websiteId = websiteId;
        // pages.push(page);
        // res.sendStatus(200);
        var page = req.body;
        model
            .pageModel
            .createPage(page)
            .then(
                function (newPage) {
                    res.json(newPage);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findPageById(req, res) {
        // var pageId = parseInt(req.params.pageId);
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         res.json(pages[p]);
        //     }
        // }
        // return '0';
        var pageId = req.params.pageId;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    if(page){
                        res.json(page);
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function findAllPagesForWebsite(req, res) {
        // var websiteId = parseInt(req.params.websiteId);
        // var websitePages = [];
        // for (var p in pages) {
        //     if (pages[p].websiteId === websiteId) {
        //         websitePages.push(pages[p]);
        //     }
        // }
        // res.json(websitePages);
        var websiteId = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    if(pages) {
                        res.json(pages);
                    } else {
                        res.json([]);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function updatePage(req, res) {
        // var pageId = parseInt(req.params.pageId);
        // var page = req.body;
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         pages[p] = page;
        //         break;
        //     }
        // }
        // res.sendStatus(200);
        var pageId = req.params.pageId;
        var page = req.body;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deletePage(req, res) {
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         pages.splice(p, 1);
        //     }
        // }
        // res.sendStatus(200);
        var pageId = parseInt(req.params.pageId);
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};