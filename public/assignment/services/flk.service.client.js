(function() {
    angular
        .module("WebAppMaker")
        .factory("MyFlickrService", MyFlickrService);

    function MyFlickrService(){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm){
            var promise = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            promise
                .success(function(){
                    return $http.get(url);
                })
                .error(function(){

                })
        }

    }
});