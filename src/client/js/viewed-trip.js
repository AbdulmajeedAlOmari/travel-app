import moment from 'moment';

const INVISIBLE_CLASS_NAME = 'd-none'

const viewedTripContainer               = document.getElementById('viewed-trip-container')
const viewedTripImage                   = document.getElementById('viewed-trip-image')
const viewedTripHeader                  = document.getElementById('viewed-trip-header')
const viewedTripTemperatureTableBody    = document.getElementById('temperature-table-body')
const viewedTripDepartureCountdown      = document.getElementById('viewed-trip-departure-countdown')
 
const viewTripCard = ({ fromCity, toCity, toCityImageURL, toCountryName, departureDate, arrayOfTemperatures }) => {

    viewedTripImage.setAttribute('src', toCityImageURL)
    viewedTripHeader.innerHTML = `<strong>${toCity}</strong> (${toCountryName})`

    const tripTemperaturesFragment = document.createDocumentFragment()

    let temperatureCount = 1

    arrayOfTemperatures.forEach(temperature => {
        const tableRowElement = document.createElement('tr')

        const temperatureNumberCell     = document.createElement('th')
        const temperatureDateCell       = document.createElement('td')
        const temperatureAvgTempCell    = document.createElement('td')
        const temperatureMinTempCell    = document.createElement('td')
        const temperatureMaxTempCell    = document.createElement('td')

        temperatureNumberCell.innerText     = temperatureCount++
        temperatureDateCell.innerText       = temperature.date
        temperatureAvgTempCell.innerText    = temperature.averageTemp
        temperatureMinTempCell.innerText    = temperature.minTemp
        temperatureMaxTempCell.innerText    = temperature.maxTemp

        temperatureNumberCell.scope = 'row'

        tableRowElement.appendChild(temperatureNumberCell)
        tableRowElement.appendChild(temperatureDateCell)
        tableRowElement.appendChild(temperatureAvgTempCell)
        tableRowElement.appendChild(temperatureMinTempCell)
        tableRowElement.appendChild(temperatureMaxTempCell)

        tripTemperaturesFragment.appendChild(tableRowElement)
    })

    viewedTripTemperatureTableBody.innerHTML = ''
    viewedTripTemperatureTableBody.appendChild(tripTemperaturesFragment)

    viewedTripDepartureCountdown.innerText = moment(departureDate).fromNow() + ` (${departureDate})`

    const isInvisible = viewedTripContainer.classList.contains(INVISIBLE_CLASS_NAME)

    if(isInvisible) {
        viewedTripContainer.classList.remove(INVISIBLE_CLASS_NAME)
    }
}

const hideViewedTripCard = () => {
    const isInvisible = viewedTripContainer.classList.contains(INVISIBLE_CLASS_NAME)

    if(isInvisible) {
        return
    }

    viewedTripContainer.classList.add(INVISIBLE_CLASS_NAME)
}


export {
    viewTripCard,
    hideViewedTripCard
}