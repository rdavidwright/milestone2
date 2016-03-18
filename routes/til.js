var express = require('express');
var router = express.Router();

var entries = [
//  {slug:"Cloning", body: "Today I learned how to clone a repository so I can access what is on my GITHUB. Let's try to make this work this time.", created_at: "some date"},
//  {slug:"Navigating", body: "Today I learned how to make the link back to the index page work. I just had to use the .. to bring it back up a level.", created_at: "some date"},
//  {slug:"Deploying", body: "Today I learned how to deploy using heroku. It took me quite a while. I finally had to start from scratch and it finally worked.", created_at: "2/13/2016"}
];

/* 1 GET til listing. */
router.get('/', function(req, res, next) {
  req.db.driver.execQuery(
    "SELECT * FROM til;"
    function(err, data){
      if(err){
        consloe.log(err);
      }
      res.render('til/index', { title: 'Entries', entries: data});
    }
  );
  // res.render('til/index', { title: 'Entries', entries: entries});
});

/* 2 til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', { title: "Make a new entry"});
});

/* 3 til/ entry. */
router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO til (slug, body) VALUES ('" + req.body.slug + "','" + req.body.body + "');",
    function(err, data){
      if(err)
      {
        console.log(err);
      }
      res.render('til/index', {title: 'Entries', entries: data});
    }
  );
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/index', {title: 'Entries', entries: data});
    }
  );
});

/* 4 entries/*update entry. */
router.get('/:id/update', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=' + parseInt(req.params.id) + ';',
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/update', {title: "Update Entry", entry: data[0]});
    }
  );
});

/* 5 post to entries */
router.post('/:id', function(req, res, next) {
  var sqlstring = "UPDATE til SET slug='" + req.body.slug + "',body='" + req.body.body + "'WHERE id=" + parseInt(req.params.id) + ";";
  console.log(sqlstring);
  req.db.driver.execQuery(
    sqlstring,
    function(err, data){
      if(err){
        console.log(err);
      }
    }
  );

  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=' + parseInt(req.params.id) + ';',
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/entry', {title: "An Entry", entry: data[0]});
    }
  );
});

/* Delete entry /entries/*number* /delete */
router.get('/:id/delete', function(req, res, next){
  req.db.driver.execQuery(
    'DELETE FROM til WHERE id=' + parseInt(req.params.id) + ';',
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/index', {title: 'Entries', entries: data});
    }
  );
});

/* 6 entries/*some number*. */
router.get('/:id', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=' + parseInt(req.params.id) + ';',
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/entry', {title: "An Entry", entry: data[0]});
    }
  )
});

module.exports = router;
