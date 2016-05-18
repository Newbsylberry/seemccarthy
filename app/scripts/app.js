'use strict';

/**
 * @ngdoc overview
 * @name seemccarthyApp
 * @description
 * # seemccarthyApp
 *
 * Main module of the application.
 */
angular
  .module('seemccarthyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    //.state('landing_page', {
    //  abstract: true,
    //  url: '/',
    //  templateUrl: 'views/landing_page.html',
    //  controller: 'LandingPageCtrl'
    //})

      .state('home', {
        url: '/',
        templateUrl: 'static_pages/home.html',
        controller: 'HomeCtrl'
      })

      .state('projects', {
        url: '/projects',
        templateUrl: 'projects/projects.html',
        controller: 'ProjectsCtrl'
      })

      .state('m_roadsters', {
        url: '/m_roadsters',
        templateUrl: 'projects/m_roadsters/m_roadsters.html',
        controller: 'MRoadstersCtrl'
      })

      .state('syracuse_weather', {
        url: '/data/syracuse_weather',
        templateUrl: 'static_pages/syracuse_weather/syracuse_weather.html',
        controller: 'SyracuseWeatherCtrl'
      })









  });
