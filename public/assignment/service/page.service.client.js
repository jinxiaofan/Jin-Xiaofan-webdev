(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
    }
    var api = {
        createPage : createPage,
        findPagesByWebsiteId: findPagesByWebsiteId,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage
    };
    return api;

    function createPage(page) {
        pages.push(page);
    }

    function findPagesByWebsiteId(websiteId) {
        var res = [];
        for(var u in pages) {
            if (pages[u].websiteId == websiteId) {
                res.push(pages[u]);
            }
        }
        return res;
    }

    function findPageById(pageId) {
        for(var u in pages) {
            if (pages[u]._id == pageId) {
                return pages[u];
            }
        }
        return null;
    }


    function updatePage(page) {
        for (var u in pages) {
            curPage = pages[u];
            if (curPage._id === page._id) {
                pages[u] = page;
            }
        }
    }

    function deletePage(userId) {
        for (var u in pages) {
            curPage = pages[u];
            if (curPage._id === userId) {
                pages.splice(u, 1);
            }
        }
    }

})();
