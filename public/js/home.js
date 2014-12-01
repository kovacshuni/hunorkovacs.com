$.backstretch("image/splash-original.jpg");

var showingName = true;

function toggleEmail() {
    if (showingName) {
        document.getElementById("fullname").innerHTML = "kovacshuni<wbr />@yahoo.com";
        showingName = false;
    } else {
        document.getElementById("fullname").innerHTML = "Hunor Kovács";
        showingName = true;
    }
}

function largen() {
    document.getElementById("theinput").style.width = "20em";
}

function smallen() {
    document.getElementById("theinput").style.width = "9.5em";
}

var app = angular.module('home', ['jp.ng-bs-animated-button']);

app.controller('AskController', ['$scope', '$http', function($scope, $http) {
    $scope.send = function() {
        $scope.isSubmitting = true;
        console.log($scope.answer);
        $scope.isSubmitting = false;
        $scope.result = 'success';
        $scope.answer = null;
    };

    $scope.answer = null;

    $scope.isSubmitting = null;
    $scope.result = null;
    $scope.options = {
        onlyIcons: true,
        buttonDefaultClass: 'btn-default btn-sm',
        buttonInitialIcon: 'fa fa-angle-right',
        buttonSuccessIcon: 'fa fa-check',
        buttonSuccessClass: 'btn-default btn-sm',
        animationCompleteTime: 500
    };
} ]);
