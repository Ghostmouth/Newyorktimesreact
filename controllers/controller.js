var express = require('express');
var router = express.Router();
var Article = require('../models/Article.js');


router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// API GET 
router.get("/api/saved", function(req, res) {
  
   // mongo query
   Article.find({}, function(err, docs){
      if (err){
        console.log(err);
      } 
      else {
        res.json(docs);
      }
   });

});


// api post
router.post("/api/saved", function(req, res) {
  
  var entry = new Article (req.body);
  // save to database
  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});


// api delete
router.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      res.sendStatus(200);
    }
  });

});

router.get("*", function(req, res) {
  res.redirect("/");
});

module.exports = router;