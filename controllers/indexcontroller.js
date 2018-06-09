var express = require("express");

var router = express.Router();


// Import the model (cat.js) to use its database functions.
//var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  res.render('home')
})

router.get('/aboutme', function(req, res) {
  res.render('aboutme')
})

router.get('/portfolio', function(req, res) {
  res.render('portfolio')
})

router.get('/contactme', function(req, res) {
  res.render('contactme')
})

/* POST to Add User Service */
router.post('/addvisitor', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    console.log("req.body:" + req.body);
    // Get our form values. These rely on the "name" attributes
    var vName = req.body.firstName;
    console.log("name:" + vName);
    var vLName = req.body.lastName;
    var vEmail = req.body.email;
    var vMessage = req.body.message;

    // Set our collection
    var collection = db.get('visitors');

    // Submit to the DB
    collection.insert({
        "firstName" : vName,
        "LastName" : vLName,
        "email" : vEmail,
        "message": vMessage
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("contactme");
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
