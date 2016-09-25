angular.module('stormfallApp', ['ui.bootstrap'])
  .controller('StormFallController', function($scope, Troop, $modal) {
    var sf = this;

    sf.troops = Troop();
 
    sf.calc = function() {
      if(sf.has_outputs()) {

        var total = 0;

        angular.forEach(sf.troops, function(troop) {
          total += troop.defense * troop.ammount;
        });

        angular.forEach(sf.troops, function(troop) {
          troop.per = (troop.defense * troop.ammount) / total;
        });


        angular.forEach(sf.troops, function(troop) {
          troop.output = 0;
        });

        angular.forEach(sf.troops, function(troop) {
          if ( troop.type == '妖獣' ) {
            troop.output = sf.calc_by_type(sf.troops, '妖獣');
          } else　if　(troop.type == '魔術') {
            troop.output = sf.calc_by_type(sf.troops, '魔術');
          } else　if　(troop.type == '騎兵') {
            troop.output = sf.calc_by_type(sf.troops, '騎兵');
          } else　if　(troop.type == '歩兵') {
            troop.output = sf.calc_by_type(sf.troops, '歩兵');
          }
        });

      } else {
        angular.forEach(sf.troops, function(troop) {
          troop.per = 0;
        });

        angular.forEach(sf.troops, function(troop) {
          troop.output = 0;
        });
      }
    };

    sf.calc_by_type = function( troops, type ) {
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

    sf.avg_defense = function() {
        var sum = 0;
        angular.forEach(sf.troops, function(troop) {
          sum += troop.output;
        });

        return sum / sf.troops.length;
    };

    sf.has_outputs = function() {
        var rtn = true;
        angular.forEach(sf.troops, function(troop) {
          if( ! $.isNumeric(troop.ammount) ) rtn = false;
        });
        return rtn;
    };

    sf.is_min_output = function(output) {
        var rtn = sf.troops[0].output;
        angular.forEach(sf.troops, function(troop) {
          if( rtn > troop.output ) rtn = troop.output;
        });
        return (rtn == output);
    };

    sf.openNewRecordForm = function(troop){
        $scope.troop = troop;
        $modal.open({
            templateUrl: "T_newRecordForm",
            scope: $scope
        });
    }

    sf.dispRaderChart = function(troop) {
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
  })
  .value('Troop', function(){
    return [
      {type:'妖獣', name:'Marennon', offence: 80, defense: 80, max_defense: 240, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/2/2c/Marennon.png'},
      {type:'魔術', name:'Ogre', offence: 60, defense: 60, max_defense: 180, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/c/c5/Ogre.png'},
      {type:'騎兵', name:'Orcish Raider', offence: 40, defense: 40, max_defense: 120, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/c/c1/Orcish_Raider.png'},
      {type:'歩兵', name:'Orc', offence: 20, defense: 20, max_defense: 60, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/b/bf/Orc.png'},
    ];
  });