var express = require('express');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Admin' });
});
 */


/*
 * GET survivorList.
 */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('survivors');
    var data = req.body;
    if (data['meta'] === 'ALL-CONTESTANTS'){
        collection.find({},{},function(e,docs){
            res.json(docs);
        });
    }
    else {
        res.render('admin', { title: 'Admin'});
    }

});
/*
 * GET weekly achievements
 */
router.get('/:weekNumber', function(req, res) {
    var db = req.db;
    var collection = db.get('week' + req.params.weekNumber);
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to weekly info.
 */
router.post('/:weekNumber', function(req, res) {
    console.log('testing server...');
    var data = req.body;
    var query = {};
    switch (data['meta']) {
        case 'TOGGLE-ACHIEVEMENT':
            var db = req.db;
            var collection = db.get('week' + req.params.weekNumber);
            query[data['achievement']] = data['value'];
            collection.update(
                { 'contestantId' : data['contestantId']},
                {
                    $set: query
                }
            )
            break;

        case 'CREATE-QUESTION':
            var db = req.db;
            var collection = db.get('questions');
            collection.insert(query, function(err, doc){
                if (err) return;
                res.json(doc);
            });
            break;

        case 'REMOVE-QUESTION':
            console.log('Inside REMOVE-QUESTION');
            var db = req.db;
            var collection = db.get('questions');
            query['_id'] = data['questionId']
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
            break;

        default:
            console.log('Bad Request');

    }
});

// ADD Player
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('survivors');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;