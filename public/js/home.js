
function setBackStretch() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        $.backstretch("image/splash-992x680.jpg");
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
        $.backstretch("image/splash-1200x822.jpg");
    } else {
        $.backstretch("image/splash-original.jpg");
    }
}

setBackStretch();

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

var app = angular.module('home', ['jp.ng-bs-animated-button']);

app.controller('AskController', ['$scope', '$http', function($scope, $http) {
    $scope.send = function() {
        $scope.isSubmitting = true;
        $http.post('/answer', $scope.answer, {headers: {'Content-Type': 'text/plain'}}).
            success(function(data, status, headers, config) {
                $scope.result = 'success';
                $scope.answer = null;
            }).
            error(function(data, status, headers, config) {
                $scope.result = 'error';
                $scope.answer = null;
            });
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
