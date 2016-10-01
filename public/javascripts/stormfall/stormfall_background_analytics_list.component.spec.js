'use strict';

describe('stormfallBackgroundAnalyticsList', function() {

  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('stormfallApp'));

  // Test the controller
  describe('StormfallBackgroundAnalyticsListController', function() {

    it('should create a `troops` model with 4', inject(function($componentController) {
      var ctrl = $componentController('stormfallBackgroundAnalyticsList');

      expect(ctrl.troops.length).toBe(4);
    }));

  });

});
