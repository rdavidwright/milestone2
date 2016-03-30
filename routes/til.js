var express = require('express');
var router = express.Router();

var entries = [];

/* 1 GET til listing. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.username);
  var name = req.cookeis.username || 'anonmous';
  req.db.driver.execQuery(
    "SELECT * FROM til;"
    function(err, data){
      if(err){
        consloe.log(err);
      }
      res.render('til/index', { title: 'Entries', entries: data});
    }
  );
});

/* 2 til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', { title: "Make a new entry"});
});

/* 3 til/ entry. */
router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO til (slug, body) VALUES (?,?);",
    [req.body.slug, req.body.body],
    function(err, data){
      if(err){
        console.log(err);
      }
      res.redirect(303, '/til/');
    }
  );
});

/* 4 entries/*update entry. */
router.get('/:id/update', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=?;',
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
  var id = parseInt(req.params.id);
  req.db.driver.execQuery(
    "UPDATE til SET slug = ?, body = ?, WHERE id = ?;",
    [req.body.slug, req.body.body, parseInt(req.params.id)],
    function(err, data){
      if(err){
        console.log(err);
      }
      res.redirect(303, '/til/' + id);
    }
  );
});

/* Delete entry /entries/*number* /delete */
router.get('/:id/delete', function(req, res, next){
  req.db.driver.execQuery(
    'DELETE FROM til WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data){
      if(err){
        console.log(err);
      }
      res.redirect(303, '/til/');
    }
  );
});

/* 6 entries/*some number*. */
router.get('/:id', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data){
      if(err){
        console.log(err);
      }
      res.render('til/entry', {title: "An Entry", entry: data[0]});
    }
  );
});

module.exports = router;
