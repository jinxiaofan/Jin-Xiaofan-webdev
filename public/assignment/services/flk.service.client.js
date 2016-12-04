(function() {
    angular
        .module("WebAppMaker")
        .factory("FlikrService", FlikrService);

    function FlikrService(){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        // my flikr key: 68712ea26ff0c663a6f168449b32f1cd
        // my flikr cecret: 51b37eb23b43e5be
        var key = "68712ea26ff0c663a6f168449b32f1cd";
        var secret = "51b37eb23b43e5be";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
        return $http.get(url);
    }
});