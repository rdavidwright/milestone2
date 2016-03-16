var express = require('express');
var router = express.Router();

var entries = [
  {slug:"Cloning", body: "Today I learned how to clone a repository so I can access what is on my GITHUB. Let's try to make this work this time.", created_at: "some date"},
  {slug:"Navigating", body: "Today I learned how to make the link back to the index page work. I just had to use the .. to bring it back up a level.", created_at: "some date"},
  {slug:"Deploying", body: "Today I learned how to deploy using heroku. It took me quite a while. I finally had to start from scratch and it finally worked.", created_at: "2/13/2016"}
];

/* 1 GET til listing. */
router.get('/', function(req, res, next) {
  req.db.driver.execQuery(
    "SELECT * FROM entries;"
    function(err, data){
      if(err){
        consloe.log(err);
      }
      res.render('til/index', { title: 'Entries', entries: entries});
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
    "INSERT INT entries (slug, body) VALUES ('" + req.body.slug + "')" + "','" + req.body.body + "');"
    function(err, data){
      if(err)
      {
        console.log(err);
      }
      res.render('til/index', {title: 'Entries', entries: entries});
    }
  );
  // entries.push(req.body);
  // res.render('til/index', {title: 'Entries', entries: entries});
});

/* 4 entries/*update entry. */
router.get('/:id/update', function(req, res, next) {
  res.render('til/update', {title: "Update entry", id: req.params.id, entry: entries[req.params.id]});
});

/* 5 post to entries */
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index', {title: 'Update an entry', entries: entries});
});

/* Delete entry /entries/*number* /delete */
router.get('/:id/delete', function(req, res, next){
  var id = req.params.id
  entries = entries.slice(0, id).concat(entries.slice(id+1, entries.length));
  res.render('til/index', {title: 'Entries', entries: entries});
});

/* 6 entries/*some number*. */
router.get('/:id', function(req, res, next) {
  res.render('til/entry', {title: "an entry", entry: entries[req.params.id]});
});

module.exports = router;
