'use strict';

var angularApp = angular.module('angularApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ngLoadingSpinner']);

angularApp.config(['$routeProvider', function($routeProvide){
    $routeProvide
        .when('/',{
            templateUrl:'template/repos.html',
            controller:'SearchCtrl'
        })
        .when('/about/', {
            templateUrl:'template/about.html'
        })
        .when('/repos/', {
            templateUrl:'template/repos.html',
            controller:'SearchCtrl'
        })
        .when('/repos/:query', {
            templateUrl:'template/repos_details.html',
            controller:'RepoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

/* factory */
angularApp.factory('GitHub', [ '$http', function ($http) {
    return {
        searchRepos: function searchRepos(query, callback) {
            $http.get('https://api.github.com/search/repositories', { params: { q: query } })
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (e) {
                    callback(e);
                });
        },
        getRepo: function getRepo(name, callback) {
            $http.get('https://api.github.com/repos/'+ name)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (e) {
                    callback(e);
                });
        }
    };
}]);

//controllers
angularApp.controller('SearchCtrl', ['$scope', '$http', 'GitHub',
    function ($scope,$http,GitHub) {
    $scope.executeSearch = function executeSearch() {
        GitHub.searchRepos($scope.query, function (error, data) {
            if (!error) {
                $scope.repos = data.items;
            }
        });
    };
    $scope.openRepo = function openRepo(name) {
        GitHub.getRepo(name, function (error, data) {
            if (!error) {
                $scope.activeRepo = data;
            }
        });
    };
}]);
angularApp.controller('RepoCtrl',['$scope', '$http', '$routeParams', 'GitHub',
    function($scope, $routeParams, $http, GitHub) {

}]);