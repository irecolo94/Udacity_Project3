// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4000; //process.env.PORT || 4000
const server = app.listen(port, ()=> {
  console.log('is it working?');
  console.log(`running on localhost:${port}`);
});

// SET UP routes
// get route

app.get('/all', (req,res) => {
  res.send(projectData);
});

// post route
app.post('/addEntry', (req,res) => {
  newEntry = {
    temperature: req.body.temperature,
    city: req.body.city,
    date: req.body.date,
    userresponse: req.body.userresponse,
  };
  projectData = newEntry;
  console.log(projectData);
});
