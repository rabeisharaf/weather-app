// Create a new date instance dynamically with JS
let date = new Date()
let currentDate =
  date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear()

// Personal API Key for OpenWeatherMap API
const urlApi = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&appid=800d2db83f1a32d080f9806007a8b29d'

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', generateAction)

/* Function called by event listener */
function generateAction(e) {
  e.preventDefault()
  const zipCode = document.getElementById('zip').value
  const userFeelings = document.getElementById('feelings').value

  Weather(urlApi, zipCode, apiKey).then(function (data) {
    console.log(data)
    postData('/add', {
      date: currentDate,
      temp: data.list[0].main.temp,
      content: userFeelings,
    })
    updateUI()
  })
}

/* Function to GET Web API Data*/
const Weather = async (url, zipCode, key) => {
  const res = await fetch(url + zipCode + key)
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
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  try {
    const Data = await res.json()
    console.log(Data)
    return Data
  } catch (error) {
    console.log('error', error)
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
  const req = await fetch('/all')
  try {
    const Data = await req.json()
    document.getElementById('date').innerHTML = `Date : ${Data[0].date}`
    document.getElementById('temp').innerHTML = `temperatuer : ${Data[0].temp}`
    document.getElementById(
      'content'
    ).innerHTML = `Feelings : ${Data[0].content}`
  } catch (error) {
    console.log('error', error)
  }
}

