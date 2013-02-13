const MONGO_URL = process.env.MONGOHQ_URL || 'mongodb://localhost/firstapp';

var mongoose = require('mongoose');
var db = mongoose.connect(MONGO_URL);

function validator(v) {
  return v.length > 0;
}

var Post = new mongoose.Schema({
    text   : { type: String, validate: [validator, "Empty Error"] }
  , created: { type: Date, default: Date.now }
});

exports.Post = db.model('Post', Post);