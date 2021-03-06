var model = require('../model');
var Post = model.Post;
var Score = model.Score;


exports.index = function(req, res){
  Post.find({}, function(err, items){
      res.render('index')
    });
};

exports.webrtc = function(req, res){
  Post.find({}, function(err, items){
      res.render('webrtc', { title: 'Entry List', items: items })
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
       res.redirect('webrtc');
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
            a_num = parseInt(a["score"]);
            b_num = parseInt(b["score"]);
            if( a_num > b_num ) return -1;
            if( a_num < b_num ) return 1;
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

exports.edge = function(req, res){
  res.render('edge');
};

exports.stormfall = function(req, res){
  Score.find({name: 'John'}, function(err, items){
        items.sort(
        function(a,b){
            a_num = parseInt(a["score"]);
            b_num = parseInt(b["score"]);
            if( a_num > b_num ) return -1;
            if( a_num < b_num ) return 1;
            return 0;
        });
        res.render('stormfall/index', { title: 'Entry List', items: items })
    });
};
