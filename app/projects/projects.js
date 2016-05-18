'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ProfilectrlCtrl
 * @description
 * # ProfilectrlCtrl
 * Controller of the voluntrApp
 */
angular.module('seemccarthyApp')
  .controller('ProjectsCtrl', function ($scope,$rootScope) {

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


  });
