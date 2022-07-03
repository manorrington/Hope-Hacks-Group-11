// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const Math = require('./models/math');
const EL = require('./models/el');
// const Science = require('./models/science'); in progress
// const Cooking = require('./models/cooking'); in progress
// const Coding = require('./models/coding'); in progress
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const port = 4000;

// Database Connection
mongoose.connect(
  'mongodb+srv://hopeuser:hopeuser1@hhdata.ecydj.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  () => console.log('DB connection successful')
);

// Middleware

app.use(bodyParser.json());
app.use(cors()); //this allows ALL domains to fetch (access) our API with no issues

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/public/images/', express.static('./public/images'));

// Set Templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// First Party API
app.get('/mathresources', (req, res) => {
  //get data from mongodb and pass it to view
  Math.find({}, function (err, data) {

    if (err) throw err;
    res.render('mathresources', { math: data });
  });
});

app.get('/elresources', (req, res) => {
  //get data from mongodb and pass it to view
  EL.find({}, function (err, data) {
    if (err) throw err;
    res.render('elresources', { el: data });
  });
});

// app.get('/scienceresources', (req, res) => {
//   //get data from mongodb and pass it to view
//   Science.find({}, function (err, data) {
//     if (err) throw err;
//     res.render('scienceresources', { science: data });
//   });
// }); in progress

// app.get('/cookingresources', (req, res) => {
//   //get data from mongodb and pass it to view
//   Cooking.find({}, function (err, data) {
//     if (err) throw err;
//     res.render('cookingresources', { cooking: data });
//   });
// }); in progress
 
// app.get('/codingresources', (req, res) => {
//   //get data from mongodb and pass it to view
//   Coding.find({}, function (err, data) {
//     if (err) throw err;
//     res.render('codingresources', { coding: data });
//   });
// }); in progress

// Submit New Data / Postman
app.post('/math', async (req, res) => {
  const post = new Math({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  };
});

app.post('/el', async (req, res) => {
  const post = new EL({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  };
});

// app.post('/science', async (req, res) => {
//   const post = new Science({
//     title: req.body.title,
//     description: req.body.description,
//     link: req.body.link
//   });

//   try {
//     const savedPost = await post.save();
//     res.json(savedPost);
//   } catch (err) {
//     res.json({ message: err });
//   };
// }); in progress

// app.post('/cooking', async (req, res) => {
//   const post = new Cooking({
//     title: req.body.title,
//     description: req.body.description,
//     link: req.body.link
//   });

//   try {
//     const savedPost = await post.save();
//     res.json(savedPost);
//   } catch (err) {
//     res.json({ message: err });
//   };
// }); in progress

// app.post('/coding', async (req, res) => {
//   const post = new Coding({
//     title: req.body.title,
//     description: req.body.description,
//     link: req.body.link
//   });

//   try {
//     const savedPost = await post.save();
//     res.json(savedPost);
//   } catch (err) {
//     res.json({ message: err });
//   };
// }); in progress


// Navigation
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/theteam', (req, res) => {
    res.render('theteam');
});

app.get('/buildaplan', (req, res) => {
    res.render('buildaplan');
});

app.get('/:learningExperience', (req, res)=> {
    let location = req.params.learningExperience;
    let dynamicsrc = `https://www.google.com/maps/embed/v1/search?q=${location}&key=AIzaSyBONgai1yh1DayA3SjpK_Otm4ZpEmPxhzg`;
    location === 'learnnearyou' ? dynamicsrc = `https://www.google.com/maps/embed/v1/search?q=my+location&key=AIzaSyBONgai1yh1DayA3SjpK_Otm4ZpEmPxhzg` : dynamicsrc = dynamicsrc;
    location === 'reset' ? dynamicsrc = `https://www.google.com/maps/embed/v1/search?q=my+location&key=AIzaSyBONgai1yh1DayA3SjpK_Otm4ZpEmPxhzg` : dynamicsrc = dynamicsrc;
    // Need to use .env file for API key later.
    res.render('learnnearyou', {dynamicsrc})
});

// Listen on Port 4000
app.listen(port, () => console.info(`App listening on port ${port}`));

