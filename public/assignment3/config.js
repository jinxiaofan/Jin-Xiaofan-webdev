(function () {
    angular
        .module("WebAppMaker")
        .config(function($routeProvider) {
            $routeProvider
                .when("/login", {
                    templateUrl:"/assignment3/views/user/login.view.client.html",
                    controller: "LoginController",
                    controllerAs:"model"
                })
                .when("/register", {
                    templateUrl:"/assignment3/views/user/register.view.client.html",
                    controller: "RegisterController",
                    controllerAs:"register"
                })
                .when("/user/:uid", {
                    templateUrl:"/assignment3/views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website", {
                    templateUrl:"/assignment3/views/websites/website-list.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/new", {
                    templateUrl:"/assignment3/views/websites/website-new.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid", {
                    templateUrl:"/assignment3/views/websites/website-edit.view.client.html",
                    controller: "WebsiteEditController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page", {
                    templateUrl:"/assignment3/views/page/page-list.view.client.html",
                    controller: "PageListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/new", {
                    templateUrl:"/assignment3/views/page/page-new.view.client.html",
                    controller: "PageListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid", {
                    templateUrl:"/assignment3/views/page/page-edit.view.client.html",
                    controller: "PageListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget", {
                    templateUrl:"/assignment3/views/widget/widget-list.view.client.html",
                    controller: "WidgetListController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                    templateUrl:"/assignment3/views/widget/widget-choose.view.client.html",
                    controller: "WidgetChooseController",
                    controllerAs:"model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                    templateUrl:"/assignment3/views/widget/widget-edit.view.client.html",
                    controller: "WidgetEditController",
                    controllerAs:"model"
                })
                .otherwise({redirectTo: "/login"});
        });

})();