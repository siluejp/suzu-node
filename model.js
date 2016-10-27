const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost/firstapp';

var mongoose = require('mongoose');
var db = mongoose.connect(MONGO_URL);

function validator(v) {
  return v.length > 0;
}

var Post = new mongoose.Schema({
    text   : { type: String, validate: [validator, "Empty Error"] }
  , created: { type: Date, default: Date.now }
});

var Score = new mongoose.Schema({
    name   : { type: String, validate: [validator, "Empty Error"] }
  , score  : { type: String }
  , created: { type: Date, default: Date.now }
});

exports.Post  = db.model('Post', Post);
exports.Score = db.model('Score', Score);
