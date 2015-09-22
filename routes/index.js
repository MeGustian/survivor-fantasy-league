var express = require('express');
var router = express.Router();
var _ = require('lodash');
var weekCount = 1;


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('home', { title: 'Survivor Fantasy League' });

});

/* Sign in */
router.post('/sign-in', function (req, res) {
  console.log('sign-in');
  var data = req.body;
  var responseData = {};
  var db = req.db;
  var users = db.get('users');
  var week = db.get('week' + weekCount);
  var survivors = db.get('survivors');
  users.findOne( { 'username' : data['username']}, function(err, userData){
    if (userData.password === data['password']){
      responseData['username'] = data['username'];
      responseData['isAdmin'] = userData.isAdmin;
      //responseData['contestantStatus'] = {};
      week.find({}, {}, function(err, docs){
        console.log('inserting contestant status week' + weekCount);
        var weekData = toObject(docs);
        weekData = _.mapKeys(weekData, function(value, key){
          return value['_id'].toHexString();
        });
        responseData['contestantStatus'] = weekData;
        responseData['weekNumber'] = weekCount;
        survivors.find({}, {}, function(err, docs) {
          console.log('inserting all contestants');
          var survivorData = toObject(docs);
          survivorData = _.mapKeys(survivorData, function (value, key) {
            return value['_id'].toHexString();
          });
          responseData['allContestants'] = survivorData;
          console.log('sending ')
          res.json(responseData);
        });
      });


    };



  })

});

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}

/* GET user page.
router.get('/:username', function(req, res, next) {
  var db = req.db;
  var collection = db.get('users');
  collection.findOne({ 'name' : req.body.name}, function(err, doc){
    console.log(doc.loggedIn)
    if (req.params.username === 'admin'){
      res.render('admin', {title: 'Admin'});
    }
    else{
      res.render('user', { title: 'Welcome ' + req.params.username});
    }
  })

});
 */
/* POST User Answer */
router.post('/:username/:weekNumber', function(req, res, next){
  var db = req.db;
  var collection = db.get('users');
  var data = req.body;
  var query = { 'answer' : data[answer]};
  collection.update(
                    { '_id' : data['questionId']},
                    { $set : query}
                   )
});


module.exports = router;



