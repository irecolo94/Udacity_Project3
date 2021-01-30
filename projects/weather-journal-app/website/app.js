/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);


// RETRIVE FROM OPENWEATHER

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=6e30485752cf2a3013a66cca6d1829f6';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newZip =  document.getElementById('zip').value;
const newFeel = document.getElementById('feelings').value;
console.log(newFeel);
getInfo(baseURL, newZip, apiKey)
.then(function(data){
  console.log(data)
  postData('/addEntry', {temperature: data.main.temp, city: data.name, date: newDate, userresponse: newFeel});
})
.then(function(){updateUI()})
}


const getInfo = async (baseURL, zip , key)=>{
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log(data.main.temp);
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

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
  }catch(error) {console.log("error", error);}
}

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = 'date: ' + allData.date;
    document.getElementById('city').innerHTML = 'your Zipcode corrisponds to: ' + allData.city; 
    document.getElementById('temp').innerHTML = 'temperature: ' + allData.temperature;
    document.getElementById('content').innerHTML = 'your feeling: ' + allData.userresponse;
  }catch(error){
    console.log("error", error);
  }
}
