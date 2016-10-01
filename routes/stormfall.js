var model = require('../model');
var Post = model.Post;
var Score = model.Score;

exports.index = function(req, res){
  res.render('stormfall/index');
};

exports.troops = function(req, res){

  res.contentType('application/json');

  var troops = [
    {type:'妖獣', name:'Marennon', offence: 80, defense: 80, max_defense: 240, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/2/2c/Marennon.png'},
    {type:'魔術', name:'Ogre', offence: 60, defense: 60, max_defense: 180, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/c/c5/Ogre.png'},
    {type:'騎兵', name:'Orcish Raider', offence: 40, defense: 40, max_defense: 120, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/c/c1/Orcish_Raider.png'},
    {type:'歩兵', name:'Orc', offence: 20, defense: 20, max_defense: 60, ammount: '', per: 0, output: 0, img_url: 'http://wiki.plarium.com/images/b/bf/Orc.png'},
  ];

  //var peopleJSON = JSON.stringify(troops);
  res.send(troops);
};
