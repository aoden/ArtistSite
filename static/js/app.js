'use strict';
var myApp = angular.module('myApp', []);


myApp.controller("uploadController", ['$scope', '$http', function ($scope, $http) {

    $scope.login = function () {

        $http({
            method: 'POST',
            url: '/login',
            data: $.param({
                file: $scope.file,
                name: $scope.name,
                price: $scope.price,
                description: $scope.description,
                type: $scope.type
            }),
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(function (resp) {

            if (resp.data.message == 'error') {

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

myApp.controller("loginCtrl", ['$scope', '$http', function ($scope, $http) {

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
                location.assign("home.html")
            }
        });
    }
}]);

