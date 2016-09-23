angular.module('todoApp', ['ui.bootstrap'])
  .controller('TodoListController', function($scope, $modal) {
    var todoList = this;
    todoList.todos = [
      {type:'妖獣', name:'Marennon', offence: 80, defense: 80, max_defense: 240, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/2/2c/Marennon.png'},
      {type:'魔術', name:'Ogre', offence: 60, defense: 60, max_defense: 180, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/c/c5/Ogre.png'},
      {type:'騎兵', name:'Orcish Raider', offence: 40, defense: 40, max_defense: 120, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/c/c1/Orcish_Raider.png'},
      {type:'歩兵', name:'Orc', offence: 20, defense: 20, max_defense: 60, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/b/bf/Orc.png'},
    ],
 
    todoList.calc = function() {
      if(todoList.has_outputs()) {

        var total = 0;

        angular.forEach(todoList.todos, function(todo) {
          total += todo.defense * todo.ammount;
        });

        angular.forEach(todoList.todos, function(todo) {
          todo.per = (todo.defense * todo.ammount) / total;
        });


        angular.forEach(todoList.todos, function(todo) {
          todo.output = 0;
        });

        angular.forEach(todoList.todos, function(todo) {
          if ( todo.type == '妖獣' ) {
            todo.output = todoList.calc_by_type(todoList.todos, '妖獣');
          } else　if　(todo.type == '魔術') {
            todo.output = todoList.calc_by_type(todoList.todos, '魔術');
          } else　if　(todo.type == '騎兵') {
            todo.output = todoList.calc_by_type(todoList.todos, '騎兵');
          } else　if　(todo.type == '歩兵') {
            todo.output = todoList.calc_by_type(todoList.todos, '歩兵');
          }
        });

      } else {
        angular.forEach(todoList.todos, function(todo) {
          todo.per = 0;
        });

        angular.forEach(todoList.todos, function(todo) {
          todo.output = 0;
        });
      }
    };

    todoList.calc_by_type = function( todos, type ) {
        var sum = 0;
        angular.forEach(todos, function(todo) {
          if ( todo.type == type ) {
            sum += todo.max_defense * todo.ammount;
          } else {
            sum += todo.defense * todo.ammount;
          }
        });

        return sum
    };

    todoList.avg_defense = function() {
        var sum = 0;
        angular.forEach(todoList.todos, function(todo) {
          sum += todo.output;
        });

        return sum / todoList.todos.length;
    };

    todoList.has_outputs = function() {
        var rtn = true;
        angular.forEach(todoList.todos, function(todo) {
          if( ! $.isNumeric(todo.ammount) ) rtn = false;
        });
        return rtn;
    };

    todoList.is_min_output = function(output) {
        var rtn = todoList.todos[0].output;
        angular.forEach(todoList.todos, function(todo) {
          if( rtn > todo.output ) rtn = todo.output;
        });
        return (rtn == output);
    };

    todoList.openNewRecordForm = function(todo){
        $scope.todo = todo;
        $modal.open({
            templateUrl: "T_newRecordForm",
            scope: $scope
        });
    }

    todoList.dispRaderChart = function(todo) {
        var w = 150, h = 150;
        var colorscale = d3.scale.category10();

        //Data
        switch (todo.type) {
          case "妖獣":
            var d = [
                [
                {axis:"攻："+todo.offence,value:todo.offence},
                {axis:"防妖："+todo.max_defense, value:todo.max_defense},
                {axis:"防魔："+todo.defense, value:todo.defense},
                {axis:"防騎："+todo.defense, value:todo.defense},
                {axis:"防歩："+todo.defense, value:todo.defense},
                ]
              ];
              break;
          case "魔術":
            var d = [
                [
                {axis:"攻："+todo.offence,value:todo.offence},
                {axis:"防妖："+todo.defense, value:todo.defense},
                {axis:"防魔："+todo.max_defense, value:todo.max_defense},
                {axis:"防騎："+todo.defense, value:todo.defense},
                {axis:"防歩："+todo.defense, value:todo.defense},
                ]
              ];
              break;
          case "騎兵":
            var d = [
                [
                {axis:"攻："+todo.offence,value:todo.offence},
                {axis:"防妖："+todo.defense, value:todo.defense},
                {axis:"防魔："+todo.defense, value:todo.defense},
                {axis:"防騎："+todo.max_defense, value:todo.max_defense},
                {axis:"防歩："+todo.defense, value:todo.defense},
                ]
              ];
              break;
          case "歩兵":
            var d = [
                [
                {axis:"攻："+todo.offence,value:todo.offence},
                {axis:"防妖："+todo.defense, value:todo.defense},
                {axis:"防魔："+todo.defense, value:todo.defense},
                {axis:"防騎："+todo.defense, value:todo.defense},
                {axis:"防歩："+todo.max_defense, value:todo.max_defense},
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
         
        //Create the title for the legend
        var text = svg.append("text")
          .attr("class", "title")
          .attr("x", w+(w/2) )
          .attr("y", h+80)
          .attr("text-anchor", "middle")
          .attr("font-size", "18px")
          .attr("font-weight", 500)
          .text("Anakin Skywalker");
    }
  });