module.exports = function (app) {

    var pages = [
        { _id: 321, name: "Post 1", websiteId: 456 },
        { _id: 432, name: "Post 2", websiteId: 456 },
        { _id: 543, name: "Post 3", websiteId: 456 }
    ];


    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/page/:pageId', findPageById);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);



    function createPage(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        var page = req.body;
        page._id = (new Date()).getTime();
        page.websiteId = websiteId;
        pages.push(page);
        res.sendStatus(200);
    }


    function findPageById(req, res) {
        var pageId = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                res.json(pages[p]);
            }
        }
        return '0';
    }


    function findAllPagesForWebsite(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        var websitePages = [];
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                websitePages.push(pages[p]);
            }
        }
        res.json(websitePages);
    }


    function updatePage(req, res) {
        var pageId = parseInt(req.params.pageId);
        var page = req.body;
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p] = page;
                break;
            }
        }
        res.sendStatus(200);
    }

    function deletePage(req, res) {
        var pageId = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages.splice(p, 1);
            }
        }
        res.sendStatus(200);
    }
};