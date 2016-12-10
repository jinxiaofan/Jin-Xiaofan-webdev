(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService(){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;


        // my flikr key: 68712ea26ff0c663a6f168449b32f1cd
        // my flikr cecret: 51b37eb23b43e5be
        var key = "68712ea26ff0c663a6f168449b32f1cd";
        var secret = "51b37eb23b43e5be";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm){
            urlBase.replace("API_KEY", key).replace("TEXT", searchTerm)
                .success(function(){
                    return $http.get(url);
                })
                .error(function(){

                });
        }
    }
});