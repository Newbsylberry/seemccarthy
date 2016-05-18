'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ProfilectrlCtrl
 * @description
 * # ProfilectrlCtrl
 * Controller of the voluntrApp
 */
angular.module('seemccarthyApp')
  .controller('MRoadstersCtrl', function ($scope,$rootScope,$http) {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (!$rootScope.color_scheme) {
      $rootScope.color_scheme = getRandomInt(1,2)
      if ($rootScope.color_scheme === 1) {
        $rootScope.option_one = true;
      } if ($rootScope.color_scheme === 2) {
        $rootScope.option_two = true;
      }
    }


    $scope.limit_number = 50;
    $scope.order_by = 'mileage'
    $scope.order_types = [{name: "Low Milegage",expression:"mileage"}]

    $http.get('/cars_i_want.json').success(function(data) {
      $scope.roadsters = [];
      angular.forEach(data, function(roadster){
        if (roadster.mileage !== 'Not Defined') {
          roadster.mileage = parseInt(roadster.mileage)
        } else if (roadster.mileage === 'Not Defined') {
          roadster.mileage = false
        }
        if (roadster.price !== 'Not Defined') {
          roadster.price = parseInt(roadster.price)
        } else if (roadster.price === 'Not Defined') {
          roadster.price = false
        }
        roadster.price = parseInt(roadster.price)
        roadster.quality_rating = parseFloat(roadster.quality_rating)
        if (roadster.price && roadster.mileage){
          $scope.roadsters.push(roadster)
        }
      })
    });

  });
