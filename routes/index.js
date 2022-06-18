var express = require('express');
var router = express.Router();

const books = [
  {
    title: "Hi there!",
    author: "Amando",
    added: new Date()
  },
  {
    title: "Hello World!",
    author: "Charles",
    added: new Date()
  }
];

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { books: books });
// });
// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

router.get('/new', function(req, res, next) {
  res.render('form');
});
router.post('/new', function(req, res, next) {
  const author = req.body.author;
  const title = req.body.title;
  console.log(author, title)
  books.push({
      title: title, 
      author: author, 
      added: new Date()
    });
  res.redirect("/");
});

module.exports = router;
