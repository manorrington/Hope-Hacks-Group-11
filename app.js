// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 4000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/public/images/', express.static('./public/images'));

// Set Templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

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

