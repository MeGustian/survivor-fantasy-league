var express = require('express');
var router = express.Router();
var _ = require('lodash');
var passport = require('passport');
var weekCount = 2;

//// =====================================
//// LOGIN ROUTES    =====================
//// =====================================

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');

});

/* POST user choices */
router.post('/', function(req, res){
  var data = req.body;
  if (data['meta'] === 'CONTESTANT-CHOICE'){
    console.log('CONTESTANT-CHOICE');
    var db = req.db;
    var collection = db.get('users');
    var choices = data['chosen'];
    collection.update(
        {'local.username' : req.user.local.username },
        {
          $set: {'chosen' : choices}
        },
        { upsert : true }
    )
    res.json(data);
  }
  else {
    res.send('error');
  }

})

/* GET user page */
router.get('/home', function(req, res, next) {

  res.render('home');

});

/* GET Login page */
router.get('/login', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('login', { message: req.flash('loginMessage') });
});


/* POST Login credentials */
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/home', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

/* GET Signup page */
router.get('/signup', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('signupMessage') });
});

/* POST Signup credentials */
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/home', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

/* GET Signout */
router.get('/sign-out', function(req, res){
  req.logout();

  res.redirect('/');
})
//// =====================================
//// LOGIN ROUTES END=====================
//// =====================================


//// =====================================
//// INITIAL ROUTE   =====================
//// =====================================

/* Retrieve initial data - return username, isAdmin, contestantStatus, weekNumber, allContestant, weekly questions */
router.get('/initial', function (req, res) {
  console.log('initial');
  var responseData = {};
  var db = req.db;
  var users = db.get('users');
  var week = db.get('week' + weekCount);
  var survivors = db.get('survivors');
  var questions = db.get('questions')
  users.findOne( { 'local.username' : req.user.local.username}, function(err, userData){
    responseData['userAnswers'] = userData.questions;
    responseData['username'] = userData.local.username;
    responseData['isAdmin'] = userData.isAdmin;
    responseData['weekNumber'] = weekCount;
    responseData['chosen'] = userData.chosen;
    survivors.find({}, {}, function(err, docs) {
      console.log('inserting all contestants');
      var survivorData = toObject(docs);
      survivorData = _.mapKeys(survivorData, function (value, key) {
        return value['_id'].toHexString();
      });
      responseData['contestants'] = survivorData;
      questions.find({}, {}, function(err, docs){
        console.log('inserting weekly questions');
        //console.log(docs);
        var questionData = toObject(docs);
        questionData = _.mapKeys(questionData, function(value, key){
          return value['_id'];
        });
        responseData['questions'] = questionData;
        console.log('sending');
        console.log(responseData);
        res.status(200).send(responseData);
      })
    });
  })

});

//// =====================================
//// META ROUTES     =====================
//// =====================================

router.post('/:weekNumber', function(req, res) {
  console.log('testing server...');
  var data = req.body;
  console.log(data['meta']);
  var query = {};
  switch (data['meta']) {
    // Submits user weekly answers to db - return questionID
    case 'USER-ANSWER':
      var db = req.db;
      var collection = db.get('users');
      var setModifier = { $set: {}};
      setModifier.$set['questions.' + data['questionId']] = data['answer'];
      collection.update(
          { 'local.username' : req.user.local.username},
          setModifier
          ,
          {
            upsert : true
          }
      );
      res.json({'questionId' : data['questionId']});

      break;

    case 'WEEK-VIEW-SELECT':
      // Retrieve all weekly data - return contestantStatus, weekNumber
      var responseData = {};
      var db = req.db;
      var week = db.get('week' + req.params.weekNumber);
      week.find({}, {}, function(err, docs) {
        console.log('inserting contestant status week' + req.params.weekNumber);
        var weekData = toObject(docs);
        weekData = _.mapKeys(weekData, function (value, key) {
          return value['contestandId'];
        });
        responseData['contestantStatus'] = weekData;
        responseData['weekNumber'] = req.params.weekNumber;
        res.json(responseData);
      });
      break;


    // Changes achievement
    case 'TOGGLE-ACHIEVEMENT':
      var db = req.db;
      var collection = db.get('survivors');
      var setModifier = { $set: {}};
      setModifier.$set['weeks.' + req.params.weekNumber + '.achievements.' + data['achievement']] = data['value'];
      collection.update(
        { '_id' : data['contestantId']},
          setModifier
        ,
        {
          upsert : true
        }
      );
      res.send(data);

      break;

    case 'CREATE-QUESTION':
      var db = req.db;
      var collection = db.get('questions');
      collection.insert({'week': req.params.weekNumber, 'type': data['type']}, function(err, doc){
        if (err) return;
        res.json({ 'questionId' : doc['_id'], 'type' : data['type']});
      });
      break;

    case 'REMOVE-QUESTION':
      console.log('Inside REMOVE-QUESTION');
      var db = req.db;
      var collection = db.get('questions');
      query['_id'] = data['questionId'];
      collection.remove(query);
      res.send(data);
      break;

    case 'UPDATE-QUESTION':
      var db = req.db;
      var collection = db.get('questions');
      if (typeof data['question'] !== 'undefined'){
        query['question'] = data['question']
      }
      if (typeof data['answer'] !== 'undefined'){
        query['answer'] = data['answer']
      }
      collection.update(
          { _id : data['questionId']},
          {
            $set: query
          }
      )
      res.json({'questionId' : data['questionId']})

      break;

    default:
      console.log('Bad Request');

  }
});



function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}

module.exports = router;


//// =====================================
//// FACEBOOK ROUTES =====================
//// =====================================
//// route for facebook authentication and login
//router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
//
//// handle the callback after facebook has authenticated the user
//router.get('/auth/facebook/callback',
//    passport.authenticate('facebook', {
//      successRedirect : '/home',
//      failureRedirect : '/'
//    }));



