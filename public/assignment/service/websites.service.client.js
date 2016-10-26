(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;


        function createWebsite(website) {
            websites.push(website);
        }


        function findWebsitesByUser(userId) {
            var result = [];
            for (var u in websites) {
                if (websites[u].developerId == userId) {
                    result.push(websites[u]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for (var u in websites) {
                if (websites[u]._id == websiteId) {
                    return websites[u];
                }
            }
            return null;
        }

        function updateWebsite(website) {
            for (var u in websites) {
                if (websites[u]._id == website._id) {
                    websites[u] = website;
                }
            }
        }


        function deleteWebsite(websiteId) {
            for (var u in websites) {
                if (websites[u]._id == websiteId) {
                    websites.splice(u, 1);
                }
            }
        }
    }
})();