(function() {
    angular
        .module("WebAppMaker")
        .factory("FlikrService", FlikrService);

    function FlikrService(){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm){
            urlBase.replace("API_KEY", key).replace("TEXT", searchTerm)
                .success(function(){
                    return $http.get(url);
                })
                .error(function(){

                })
        }

    }
});