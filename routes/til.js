var express = require('express');
var router = express.Router();

var entries = [
  {slug:"How to pass class.", body: "Come to class, do your homework."},
  {slug:"How to fail class.", body: "Don't do anything."},
  {slug:"What to do in class.", body: "Listen well and take notes."}
];

/* 1 GET til listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Entries', entries: entries});
});

/* 2 til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', { title: "Make a new entry"});
});

/* 3 til/ entry. */
router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('til/index', {title: 'Entries', entries: entries});
});

/* 4 entries/*update entry. */
router.get('/update/:id', function(req, res, next) {
  res.render('til/update', {title: "Update entry", id: req.params.id, entry: entries[req.params.id]});
});

/* 5 post to entries */
router.post('/update/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index', {title: 'Update an entry', entries: entries});
});

/* 6 entries/*some number*. */
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  res.render('til/entry', {title: "an entry", entry: entries[req.params.id]});
});

module.exports = router;
