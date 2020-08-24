import moment from 'moment';

const INVISIBLE_CLASS_NAME = 'd-none'

const viewedTripContainer           = document.getElementById('viewed-trip-container')
const viewedTripImage               = document.getElementById('viewed-trip-image')
const viewedTripHeader              = document.getElementById('viewed-trip-header')
const viewedTripTemperaturesHolder  = document.getElementById('viewed-trip-temperature-list')
const viewedTripDepartureCountdown  = document.getElementById('viewed-trip-departure-countdown')
 
const viewTripCard = ({ fromCity, toCity, toCityImageURL, toCountryName, departureDate, arrayOfTemperatures }) => {

    viewedTripImage.setAttribute('src', toCityImageURL)
    viewedTripHeader.innerHTML = `<strong>${toCity}</strong> (${toCountryName})`

    const tripTemperaturesFragment = document.createDocumentFragment()

    arrayOfTemperatures.forEach(temperature => {
        const li = document.createElement('li')
        li.innerText = temperature.averageTemp

        tripTemperaturesFragment.appendChild(li)
    })

    viewedTripTemperaturesHolder.innerHTML = ''
    viewedTripTemperaturesHolder.appendChild(tripTemperaturesFragment)

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