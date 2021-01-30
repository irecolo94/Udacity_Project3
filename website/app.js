// Global Variables
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=6e30485752cf2a3013a66cca6d1829f6';

// RETRIVE FROM OPENWEATHER
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const newZip = document.getElementById('zip').value;
  const newFeel = document.getElementById('feelings').value;
  getInfo(baseURL, newZip, apiKey)
    .then(function(data) {
      postData('/addEntry', {
        temperature: data.main.temp,
        city: data.name,
        date: newDate,
        userresponse: newFeel
      });
    })
    .then(function() {
      updateUI()
    })
}

// GET data from given baseurl
const getInfo = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// POST the data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  } catch (error) {
    console.log("error", error);
  }
}

// DYNAMICALLY UPDATE UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'date: ' + allData.date;
    document.getElementById('city').innerHTML = 'your Zipcode corrisponds to: ' + allData.city;
    document.getElementById('temp').innerHTML = 'temperature: ' + allData.temperature;
    document.getElementById('content').innerHTML = 'your feeling: ' + allData.userresponse;
  } catch (error) {
    console.log("error", error);
  }
}
