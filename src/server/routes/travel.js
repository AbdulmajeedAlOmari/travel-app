const express = require('express')
const router = express.Router()
const axios = require('axios')

const GEONAMES_API_URL    = 'http://api.geonames.org/searchJSON'
const WEATHER_BIT_API_URL  = 'https://api.weatherbit.io/v2.0/forecast/daily'
const PIXABAY_API_URL     = 'https://pixabay.com/api'

const NUMBER_OF_FORECAST_DAYS = 5

// http://api.geonames.org/searchJSON?q={CITY_NAME}&maxRows=1&username={API_USERNAME} <-- Use this one
// https://api.weatherbit.io/v2.0/forecast/daily?lat=24.68773&lon=46.72185&days=3&key={API_KEY}
// https://pixabay.com/api/?key={API_KEY}&q={CITY_NAME}&per_page=3&image_type=photo&category=places

const retriveTripDetails = (cityName) => {
  const tripDetails = {}

  return new Promise((resolve, reject) => {
    axios.get(GEONAMES_API_URL, {
      params: {
        q: cityName,
        maxRows: 1,
        username: process.env.GEONAMES_API_USERNAME,
      }
    })
    .then(response => response.data)
    .then(geonamesData => {

      const { name, countryName, lat, lng } = geonamesData.geonames[0]

      tripDetails.cityName = name
      tripDetails.countryName = countryName
      tripDetails.lat = lat
      tripDetails.lng = lng

      axios.get(WEATHER_BIT_API_URL, {
        params: {
          lat: lat,
          lon: lng,
          days: NUMBER_OF_FORECAST_DAYS,
          key: process.env.WEATHER_BIT_API_KEY
        }
      })
      .then(response => response.data)
      .then(weatherBitData => {
        const arrayOfForecasts = weatherBitData.data

        const arrayOfTemperatures = []

        arrayOfForecasts.forEach(forecast => {
          arrayOfTemperatures.push({
            averageTemp: forecast.temp,
            minTemp: forecast.min_temp,
            maxTemp: forecast.max_temp,
            date: forecast.datetime,
          })
        })

        tripDetails.arrayOfTemperatures = arrayOfTemperatures

        axios.get(PIXABAY_API_URL, {
          params: {
            q: cityName,
            per_page: 3,
            image_type: 'photo',
            category: 'places',
            key: process.env.PIXABAY_API_KEY,
          }
        })
            .then(response => response.data)
            .then(pixabayData => {
              const { largeImageURL } = pixabayData.hits[0]

              tripDetails.imageURL = largeImageURL

              resolve(tripDetails)
            })
            .catch(e => {
              // Allow no image
              resolve(tripDetails)
            })
      })
      .catch(e => {
        reject('City was not found')
      })
    })
    .catch(e => {
      reject('City was not found')
    })
  })
}

router.get('/', async (req, res) => {
  const { cityName } = req.query

  let trip = null

  try {
    trip = await retriveTripDetails(cityName)
    res.send(trip)
  } catch (errorMessage) {
    console.log(errorMessage)
    res.send({
      errorMessage,
    }).status(400)
  }
})


module.exports = router