angular.
  module('suzuNodeApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/stormfall', {
          template: '<stormfall-background-analytics-list></stormfall-background-analytics-list>'
        }).
        when('/about', {
          template: '<stormfall-tip-list></stormfall-tip-list>'
        }).
        otherwise('/stormfall');
    }
  ]);