'use strict';
var myApp = angular.module('myApp', ['ngCookies']);


myApp.controller('resetController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    $scope.reset = function () {

        $http({
            method: 'POST',
            url: '/reset',
            data: $.param({
                email: $scope.email,
                token: $scope.token
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (resp) {

            if (resp.data.message = 'error') {
                $scope.reset_pwd_message = 'There is something wrong, please try again'
            } else {
                location.assign('login.html')
            }
        });
    }
}]);


myApp.controller("signupCtrl", ['$scope', '$http', function ($scope, $http) {

        $scope.signup = function () {

            $http({
                method: 'POST',
                url: '/signup',
                data: $.param({email: $scope.email, password: $scope.password, name: $scope.name}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                location.assign("login");
            })
        }
    }]
);

myApp.controller("loginCtrl", ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    $scope.login = function () {

        $http({
            method: 'POST',
            url: '/login',
            data: $.param({email: $scope.email, password: $scope.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (resp) {

            if (resp.data.message == 'error') {
                $scope.error_message = 'Wrong email or password!'
            } else {
                $cookies.put('token', resp.data.token)
                location.assign("home.html")
            }
        });
    }
}]);

myApp.controller("uploadController", ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    $http({
        method: 'GET',
        url: '/token',
        data: $.param({
            token: $cookies.get('token'),
        }),
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(function (resp) {

        if (resp.data.message = 'success') {

        } else {
            location.assign('login.html')
        }
    });

    $scope.upload = function () {

        $http({
            method: 'get',
            url: '/token',
            data: $.param({
                token: $cookies.get(token)
            }),
        }).then(function (res) {

            if (res.data.message == 'error') {
                location.assign("login.html")
            }
        });
        $http({
            method: 'POST',
            url: '/login',
            data: $.param({
                file: $scope.file,
                name: $scope.name,
                price: $scope.price,
                description: $scope.description,
                type: $scope.type,
                token: $cookies.get(token)
            }),
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(function (res) {

            if (res.data.message == 'error') {

                $scope.error_message = 'There is some error, please check again!'
            } else {
                location.assign("profile.html")
            }
        });
    }
}]);


myApp.controller("signupCtrl", ['$scope', '$http', function ($scope, $http) {

        $scope.signup = function () {

            $http({
                method: 'POST',
                url: '/signup',
                data: $.param({email: $scope.email, password: $scope.password, name: $scope.name}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                location.assign("login");
            })
        }
    }]
);

myApp.controller("loginCtrl", ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    $scope.login = function () {

        $http({
            method: 'POST',
            url: '/login',
            data: $.param({email: $scope.email, password: $scope.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (resp) {

            if (resp.data.message == 'error') {
                $scope.error_message = 'Wrong email or password!'
            } else {
                $cookies.put('token', resp.data.token)
                location.assign("home.html")
            }
        });
    }
}]);

