// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const Math = require("./models/math");
const Reading = require("./models/reading");
const Coding = require("./models/coding");
const Cooking = require("./models/cooking");
const Science = require("./models/science");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4000;

//database connection
mongoose.connect(
/* "mongodb+srv://testuser21:testuser21@testing.vjv0v0g.mongodb.net/?retryWrites=true&w=majority", */
 "mongodb+srv://hopeuser:hopeuser1@hhdata.ecydj.mongodb.net/?retryWrites=true&w=majority", 
  { useNewUrlParser: true, 
  },
  () => console.log("MongoDB connection successful!")
);

//second database (SQL) connection
const mysql = require('mysql');
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'node_crud'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('SQL Database Connected!');
}); 

// Middleware
app.use(bodyParser.json());
app.use(cors()); //this allows ALL domains to fetch (access) our API with no issues

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/public/images/', express.static('./public/images'));

//set views file
app.set('views',path.join(__dirname,'views'));

// Set Templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// ---------------------------------------Study Planner-------------------------------------------
app.get('/studyplan',(req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM users";
  let query = connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('user_index', {
          title : 'Create A Study Plan!',
          users : rows
      });
  });
});

app.get('/add',(req, res) => {
  res.render('user_add', {
      title : 'Add A Study Item'
  });
});

app.post('/save',(req, res) => { 
  let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
  let sql = "INSERT INTO users SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/studyplan');
  });
});

app.get('/edit/:userId',(req, res) => {
  const userId = req.params.userId;
  let sql = `Select * from users where id = ${userId}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.render('user_edit', {
          title : 'Edit Study Plan',
          user : result[0]
      });
  });
});

app.post('/update',(req, res) => {
  const userId = req.body.id;
  let sql = "update users SET name='"+req.body.name+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+userId;
  let query = connection.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/studyplan');
  });
});

app.get('/delete/:userId',(req, res) => {
  const userId = req.params.userId;
  let sql = `DELETE from users where id = ${userId}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.redirect('/studyplan');
  });
});

// --------------------------------------End Study Planner----------------------------------------

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

app.get("/scienceresources", (req, res) => {
  //get data from mongodb and pass it to view
  Science.find({}, function (err, data) {
    if (err) throw err;
    res.render('scienceresources', { science: data });
  });
});

// Post for math data
app.post("/math", async (req, res) => {
  
  const post = new Math({
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

// Post for cooking data
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

// Post for coding
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
});

// Post for coding
app.post("/science", async (req, res) => {
  
  const post = new Science({
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
});

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






// app.get('/studyplan',(req, res) => {
//   // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
//   let sql = "SELECT * FROM users";
//   let query = connection.query(sql, (err, rows) => {
//       if(err) throw err;
//       res.render('studyplan', {
//           title : 'Create a Study Plan!',
//           users : rows
//       });
//   });
// });

// app.get('/plan_add',(req, res) => {
//   res.render('plan_add', {
//       title : 'Add To Study Plan'
//   });
// });

// app.get('/plan_edit',(req, res) => {
//   res.render('plan_edit', {
//       title : 'Edit Study Plan'
//   });
// });

// app.get('/edit/:userId',(req, res) => {
//   const userId = req.params.userId;
//   let sql = `Select * from users where id = ${userId}`;
//   let query = connection.query(sql,(err, result) => {
//       if(err) throw err;
//       res.render('plan_edit', {
//           title : 'Edit Study Plan',
//           user : result[0]
//       });
//   });
// });

// app.get('/delete/:userId',(req, res) => {
//   const userId = req.params.userId;
//   let sql = `DELETE from users where id = ${userId}`;
//   let query = connection.query(sql,(err, result) => {
//       if(err) throw err;
//       res.redirect('/studyplan');
//   });
// });

// app.post('/save',(req, res) => { 
//   let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
//   let sql = "INSERT INTO users SET ?";
//   let query = connection.query(sql, data,(err, results) => {
//     if(err) throw err;
//     res.redirect('/studyplan');
//   });
// });

// app.post('/update',(req, res) => {
//   const userId = req.body.id;
//   let sql = "update users SET name='"+req.body.name+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+userId;
//   let query = connection.query(sql,(err, results) => {
//     if(err) throw err;
//     res.redirect('/studyplan');
//   });
// });