angular.
  module('stormfallApp').
  component('stormfallTipList', {
    templateUrl: '/js/stormfall/stormfall_tip_list.template.html',
    controller: function StormfallTipListController($scope, $modal, $http) {

      var self = this;

      self.reference_point = 0.029857143;

      self.point        = '';
      self.unit_ammount = '';

      self.calc_from_point = function() {
        self.point = self.float_format(self.unit_ammount * self.reference_point, 0);
      };

      self.calc_from_unit = function() {
        self.unit_ammount = self.float_format(self.point / self.reference_point, 0);
      };

      self.float_format = function( number, n ) {
      	var _pow = Math.pow( 10 , n ) ;
      	return Math.round( number * _pow ) / _pow ;
      };
    }
  });
