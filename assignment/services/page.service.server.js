module.exports = function(app, model) {
    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findALLPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);



    function createPage(req, res) {
        var page = req.body;
        model.pageModel.createPage(page)
            .then(
                function(newPage) {
                    res.send(newPage);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findALLPagesForWebsite(req, res) {
        var wid = req.params.wid;
        model.pageModel.findALLPagesForWebsite(wid)
            .then(
                function(pages){
                    if(pages){
                        res.json(pages);
                    } else {
                        res.json([]);
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        model.pageModel.findPageById(pid)
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


    function updatePage(req, res){
        var page = req.body;
        var pid = req.params.pid;
        model.pageModel.updatePage(pid, page)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }



    function deletePage(req,res){
        var pid = req.params.pid;
        model.pageModel.deletePage(pid)
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