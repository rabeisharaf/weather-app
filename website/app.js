// Create a new date instance dynamically with JS
let date = new Date()
let d = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear()

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apikey = '&appid=800d2db83f1a32d080f9806007a8b29d'

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction)

/* Function called by event listener */
function performAction(e) {
  e.preventDefault()
  const newZip = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value

  getWeather(baseURL, newZip, apikey)
    // New Syntax!
    .then(function (data) {
      // Add data
      console.log(data)
      postData('/add', {
        date: d,
        temp: data.list[0].main.temp,
        content: feelings,
      })
      updateUI()
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error', error)
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })

  try {
    const newData = await response.json()
    console.log(newData)
    return newData
  } catch (error) {
    console.log('error', error)
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = `Date : ${allData[0].date}`
    document.getElementById(
      'temp'
    ).innerHTML = `temperatuer : ${allData[0].temp}`
    document.getElementById(
      'content'
    ).innerHTML = `i feel : ${allData[0].content}`
  } catch (error) {
    console.log('error', error)
  }
}

// Async POST
