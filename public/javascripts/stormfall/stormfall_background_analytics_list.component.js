angular.
  module('stormfallApp').
  component('stormfallBackgroundAnalyticsList', {
    templateUrl: '/js/stormfall/stormfall_background_analytics_list.template.html',
    controller: function StormfallBackgroundAnalyticsListController($scope, $modal, $http) {

      var self = this;

      $http.get('stormfall/troops.json').then(function(response) {
        self.troops = response.data;
      });

      self.calc = function() {
        if(self.has_outputs()) {

          var total = 0;

          angular.forEach(self.troops, function(troop) {
            total += troop.defense * troop.ammount;
          });

          angular.forEach(self.troops, function(troop) {
            troop.per = (troop.defense * troop.ammount) / total;
          });


          angular.forEach(self.troops, function(troop) {
            troop.output = 0;
          });

          angular.forEach(self.troops, function(troop) {
            if ( troop.type == '妖獣' ) {
              troop.output = self.calc_by_type(self.troops, '妖獣');
            } else　if　(troop.type == '魔術') {
              troop.output = self.calc_by_type(self.troops, '魔術');
            } else　if　(troop.type == '騎兵') {
              troop.output = self.calc_by_type(self.troops, '騎兵');
            } else　if　(troop.type == '歩兵') {
              troop.output = self.calc_by_type(self.troops, '歩兵');
            }
          });

        } else {
          angular.forEach(self.troops, function(troop) {
            troop.per = 0;
          });

          angular.forEach(self.troops, function(troop) {
            troop.output = 0;
          });
        }
      };

      self.calc_by_type = function( troops, type ) {
          var sum = 0;
          angular.forEach(troops, function(troop) {
            if ( troop.type == type ) {
              sum += troop.max_defense * troop.ammount;
            } else {
              sum += troop.defense * troop.ammount;
            }
          });

          return sum
      };

      self.avg_defense = function() {

          if (!self.troops) return;

          var sum = 0;
          angular.forEach(self.troops, function(troop) {
            sum += troop.output;
          });

          return sum / self.troops.length;
      };

      self.get_total_offence = function() {
          var sum = 0;
          angular.forEach(self.troops, function(troop) {
            sum += troop.offence * troop.ammount;
          });

          return sum;
      };

      self.has_outputs = function() {
          var rtn = true;
          angular.forEach(self.troops, function(troop) {
            if( ! $.isNumeric(troop.ammount) ) rtn = false;
          });
          return rtn;
      };

      self.is_min_output = function(output) {
          var rtn = self.troops[0].output;
          angular.forEach(self.troops, function(troop) {
            if( rtn > troop.output ) rtn = troop.output;
          });
          return (rtn == output);
      };

      self.openNewRecordForm = function(troop){
          $scope.troop = troop;
          $modal.open({
              templateUrl: "T_newRecordForm",
              scope: $scope
          });
      }

      self.dispRaderChart = function(troop) {
          var w = 150, h = 150;
          var colorscale = d3.scale.category10();

          //Data
          switch (troop.type) {
            case "妖獣":
              var d = [
                  [
                  {axis:"攻："+troop.offence,value:troop.offence},
                  {axis:"防妖："+troop.max_defense, value:troop.max_defense},
                  {axis:"防魔："+troop.defense, value:troop.defense},
                  {axis:"防騎："+troop.defense, value:troop.defense},
                  {axis:"防歩："+troop.defense, value:troop.defense},
                  ]
                ];
                break;
            case "魔術":
              var d = [
                  [
                  {axis:"攻："+troop.offence,value:troop.offence},
                  {axis:"防妖："+troop.defense, value:troop.defense},
                  {axis:"防魔："+troop.max_defense, value:troop.max_defense},
                  {axis:"防騎："+troop.defense, value:troop.defense},
                  {axis:"防歩："+troop.defense, value:troop.defense},
                  ]
                ];
                break;
            case "騎兵":
              var d = [
                  [
                  {axis:"攻："+troop.offence,value:troop.offence},
                  {axis:"防妖："+troop.defense, value:troop.defense},
                  {axis:"防魔："+troop.defense, value:troop.defense},
                  {axis:"防騎："+troop.max_defense, value:troop.max_defense},
                  {axis:"防歩："+troop.defense, value:troop.defense},
                  ]
                ];
                break;
            case "歩兵":
              var d = [
                  [
                  {axis:"攻："+troop.offence,value:troop.offence},
                  {axis:"防妖："+troop.defense, value:troop.defense},
                  {axis:"防魔："+troop.defense, value:troop.defense},
                  {axis:"防騎："+troop.defense, value:troop.defense},
                  {axis:"防歩："+troop.max_defense, value:troop.max_defense},
                  ]
                ];
                break;
          }



          //Options for the Radar chart, other than default
          var mycfg = {
            w: w,
            h: h,
            maxValue: 0.6,
            levels: 5,
            ExtraWidthX: 300
          }

          //Call function to draw the Radar chart
          //Will expect that data is in %'s
          RadarChart.draw('#chart', d, mycfg);

          ////////////////////////////////////////////
          /////////// Initiate legend ////////////////
          ////////////////////////////////////////////

          var svg = d3.select('#body')
            .selectAll('svg')
            .append('svg')
            .attr("width", w)
            .attr("height", h+100)
      }
    },
  });
