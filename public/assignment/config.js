(function () {
    angular
        .module("WebAppMaker")
        .config(function($routeProvider) {
            $routeProvider
                .when("/login", {
                    templateUrl:"/views/user/login.view.client.html",
                    controller: "LoginController",
                    controllerAs:"model"
                })
                .when("/register", {
                    templateUrl:"/views/user/register.view.client.html",
                    controller: "RegisterController",
                    controllerAs:"register"
                })
                .when("/user/:uid", {
                    templateUrl:"/views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website", {
                    templateUrl:"/views/websites/website-list.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/new", {
                    templateUrl:"/views/websites/website-new.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid", {
                    templateUrl:"/views/websites/website-edit.view.client.html",
                    controller: "WebsiteEditController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page", {
                    templateUrl:"/views/page/page-list.view.client.html",
                    controller: "PageListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/new", {
                    templateUrl:"/views/page/page-new.view.client.html",
                    controller: "PageListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid", {
                    templateUrl:"/views/page/page-edit.view.client.html",
                    controller: "PageListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget", {
                    templateUrl:"/views/widget/widget-list.view.client.html",
                    controller: "WidgetListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                    templateUrl:"/views/widget/widget-choose.view.client.html",
                    controller: "WidgetChooseController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                    templateUrl:"/views/widget/widget-edit.view.client.html",
                    controller: "WidgetEditController",
                    controllerAs:"model"
                })
                .otherwise({redirectTo: "/login"});
        });

})();