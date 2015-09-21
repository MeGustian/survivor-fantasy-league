var express = require('express');
var router = express.Router();


/* GET user page. */
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



// Submit WeeklyQuestion Answers
router.post('/:username/submitAnswers', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  var submissions = req.body;
  collection.update(
      { 'name': req.params.username },
      {
        $set: {
          'regQuestion1': submissions['regQuestion1'],
          'regQuestion2': submissions['regQuestion2'],
          'regQuestion3': submissions['regQuestion3'],
          'regQuestion4': submissions['regQuestion4'],
          'regQuestion5': submissions['regQuestion5'],
          'speQuestion1': submissions['speQuestion1'],
          'speQuestion2': submissions['speQuestion2'],
          'speQuestion3': submissions['speQuestion3']
        }
      }
  )
  res.send('success')
})


// Submit Contestant Choices
router.post('/:username/submit', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  var submissions = req.body;
  collection.update(
      { 'name': req.params.username },
      {
        $set: {
          'choice1': submissions['choice1'],
          'choice2': submissions['choice2'],
          'choice3': submissions['choice3'],
          'choice4': submissions['choice4']
        }
      }
  )
  res.send('success')
})



/* Login */
router.post('/login', function(req, res) {

  var db = req.db;
  var collection = db.get('users');
  var userPass = req.body.password;
  var userName = req.body.name;
  console.log('logging into user: ' + userName);

  collection.findOne({'name' : userName }, function(err, doc) {
    if (doc.password === userPass){
      console.log('loading user page: ' + userName);

      console.log(doc.loggedIn);
      doc.loggedIn = true;
      collection.update(
          { 'name': userName },
          {$set: {'loggedIn': true}}
      )
      console.log(doc.loggedIn);
      res.redirect(userName);
    }
    else {
      console.log('FAILED!');
      res.render('index');
    }
  });

});

// ADD USER
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.insert(req.body, function(err, result){
    res.redirect(req.body.name);
  });
});


module.exports = router;