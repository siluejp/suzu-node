var model = require('../model');
var Post = model.Post;
var Score = model.Score;

exports.index = function(req, res){
  Post.find({}, function(err, items){
      res.render('index', { title: 'Entry List', items: items })
    });
};

exports.form = function(req, res){
  res.render('form', { title: 'New Entry' })
};

exports.create = function(req, res){
  var newPost = new Post(req.body);
  newPost.save(function(err){
     if (err) {
       console.log(err);
       res.redirect('back');
     } else {
       res.redirect('/');
     }
    });
};

exports.money = function(req, res){
  res.render('money');
}

exports.game = function(req, res){
  res.render('game');
}

exports.score_list = function(req, res){
  Score.find({name: 'John'}, function(err, items){
        items.sort(
        function(a,b){
            if( a["score"] > b["score"] ) return -1;
            if( a["score"] < b["score"] ) return 1;
            return 0;
        });
        res.render('score_list', { title: 'Entry List', items: items })
    });
};

exports.score = function(req, res){
  var newPost = new Score(req.body);
  newPost.save(function(err){
     if (err) {
       console.log(err);
     }
    });
};