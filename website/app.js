// global variable
let date = new Date()
const urlApi = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&appid=800d2db83f1a32d080f9806007a8b29d'
const zipCode = document.getElementById('zip')
const userFeelings = document.getElementById('feelings')

// Event listener of generate

document.getElementById('generate').addEventListener('click', generateAction)
function generateAction(e) {
  e.preventDefault()
  Weather(urlApi, zipCode.value, apiKey).then(function (data) {
    console.log(data)
    postData('/add', {
      date: date,
      temp: data.list[0].main.temp,
      content: userFeelings.value,
    })
    retrieveData()
  })
}
// end of Event listener of generate

// GET Web API Data
const Weather = async (url, zipCode, key) => {
  const res = await fetch(url + zipCode + key)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error', error)
  }
}
// end of GET Web API Data

// POST data
const postData = async (url = '', data = {}) => {
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
    return Data
  } catch (error) {
    console.log('error', error)
  }
}
// end of POST data

/* update Data in ui */
const retrieveData = async () => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    console.log(allData)
    document.getElementById('temp').innerHTML = `Temperatuer : 
      ${Math.round(allData[0].temp) + 'degrees'}`
    document.getElementById(
      'content'
    ).innerHTML = `Feelings :  ${allData[0].content}`
    document.getElementById('date').innerHTML = `Date :  ${allData[0].date}`
  } catch (error) {
    console.log('error', error)
  }
}
