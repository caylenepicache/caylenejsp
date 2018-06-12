var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();

var logger = require("morgan");
var mongojs = require("mongojs");

// Serve static content for the app from the "public" directory in the application directory.
//app.use(express.static("public"));
app.use('/public', express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', './views')


/*mongo*/
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Static file support with public folder
app.use(express.static("public"));

// Mongojs configuration
var databaseUrl = "mongodb://heroku_gbgnxfm4:m4g5jvule8jt8nsh50ckau5srd@ds153890.mlab.com:53890/heroku_gbgnxfm4";
var collections = ["heroku_gbgnxfm4"];

// Hook our mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


/*MONGO*/

app.post('/addvisitor', function(req, res) {

  // Set our internal DB variable
 // var db = req.db;
 // console.log("db"+ req.db)
  console.log("req.body:" + req.body);
  // Get our form values. These rely on the "name" attributes
  var vName = req.body.firstName;
  console.log("name:" + vName);
  var vLName = req.body.lastName;
  var vEmail = req.body.email;
  var vMessage = req.body.message;

  // Set our collection
 // var collection = db.visitors

  // Submit to the DB
  db.visitors.insert({
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


// Import routes and give the server access to them.
var routes = require("./controllers/indexcontroller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
