var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/bloglist', function(req, res) {
    var db = req.db;
    var collection = db.get('blogcollection');
    collection.find({},{},function(e,docs){
        res.render('bloglist', {
            "bloglist" : docs
        });
    });
});


// get blog content
router.get('/blogcontent', function(req, res, next, id) {
    var db = req.db;
    //var title = req.body.title;
    //console.log(title);
    var collection = db.get('blogcollection');
    collection.findOne({_id:db.ObjectId(id)},{},function(e,docs){
        res.render('blogcontent', {            
	"blogcontent" : docs
        });
    });
});



/* GET New blog page. */
router.get('/newblog', function(req, res) {
    res.render('newblog', { title: 'Add New Blog' });
});


/* POST to Add User Service */
router.post('/addblog', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var title = req.body.title;
    var body = req.body.body;

    // Set our collection
    var collection = db.get('blogcollection');

    // Submit to the DB
    collection.insert({
        "title" : title,
        "body" : body
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("bloglist");
            // And forward to success page
            res.redirect("bloglist");
        }
    });
});

module.exports = router;
