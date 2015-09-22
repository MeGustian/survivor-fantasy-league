var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('I got here!');
  res.redirect('ajax');
  //var db = req.db;
  //var collection = db.get('test');
  //query = { 'test' : 'succeeded'};
  //collection.insert(query);
  //res.render('home', { title: 'Survivor Fantasy League' });

});

/*
 * TESTING /ajax with redirects
 */
router.get('/ajax', function(req, res){
  console.log('here');
  res.redirect('/admin/1');
})


router.post('/sign-in', function (req, res) {
  console.log('sign-in');
  console.log(req.body);
  if (true) {
    res.status(200).send(req.body);
  }
  if (!true) {
    res.status(500).send({error: req.body});
  }
  // timeout...
});


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



