// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const Math = require("./models/math");
const Reading = require("./models/reading");
const Coding = require("./models/coding");
const Cooking = require("./models/cooking");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 4000;

//database connection
mongoose.connect(
/* "mongodb+srv://testuser21:testuser21@testing.vjv0v0g.mongodb.net/?retryWrites=true&w=majority", */
 "mongodb+srv://hopeuser:hopeuser1@hhdata.ecydj.mongodb.net/?retryWrites=true&w=majority", 
  { useNewUrlParser: true, 
  },
  () => console.log("DB connection successful")
);

//Middleware
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

//First Party API
app.get("/mathresources", (req, res) => {
  //get data from mongodb and pass it to view
  Math.find({}, function (err, data) {
    if (err) throw err;
    res.render('mathresources', { math: data });
  });
});

app.get("/codingresources", (req, res) => {
  //get data from mongodb and pass it to view
  Coding.find({}, function (err, data) {
    if (err) throw err;
    res.render('codingresources', { math: data });
  });
});

app.get("/cookingresources", (req, res) => {
  //get data from mongodb and pass it to view
  Cooking.find({}, function (err, data) {
    if (err) throw err;
    res.render('cookingresources', { math: data });
  });
});

app.get("/englishresources", (req, res) => {
  //get data from mongodb and pass it to view
  Reading.find({}, function (err, data) {
    if (err) throw err;
    res.render('englishresources', { math: data });
  });
});

//gets all posts
// app.get("/resources", async (req, res) => {
//   try {
//     const posts = await Resources.find();
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   };
// });

//submits a post
app.post("/resources", async (req, res) => {
  
  const post = new Resources({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });
  
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    console.log(err);
  }; 
});

// Post for reading data
app.post("/reading", async (req, res) => {
  
  const post = new Reading({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });
  
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    //res.json({ message: err });
    console.log(err);
  };
   
})

//Post for cooking data
app.post("/cooking", async (req, res) => {
  
  const post = new Cooking({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });
  
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  };
   
})

//Post for coding
app.post("/coding", async (req, res) => {
  
  const post = new Coding({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });
  
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  };
   
})

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

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`));

