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
  console.log(`running on localhost:${port}`)
});

// SET UP routes
// get:

app.get('/', (req, res)=> {
  res.send(projectData);
});

// app.get('/api.openweathermap.org/data/2.5/weather?zip=85254&appid=6e30485752cf2a3013a66cca6d1829f6', (req, res) => {
//   res.send(data);
// });
 //statt '/' das hier: baseURL+zip+key
//
// // post:
// //
// const data = [];

app.post('/', (req, res)=> {
  res.send('POST received')
});

app.post('/newPost', (req, res) => {
  let data = req.body;
  // data.push(req.body);
  newData = {}
  projectData['temperature'] = data.temperature;
  projectData['date'] = data.date;
  projectData['user response'] = data.userResponse;
  console.log(projectData);
});
