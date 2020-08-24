// Local storage (saved trips) key
const SAVED_TRIPS_KEY = 'SAVED_TRIPS';

const saveTripsToLocalStorage = (savedTrips) => {
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(savedTrips))
}

const loadTripsFromLocalStorage = () => {
    const loadedTrips = localStorage.getItem(SAVED_TRIPS_KEY)
    return JSON.parse(loadedTrips)
}

export {
    saveTripsToLocalStorage,
    loadTripsFromLocalStorage,
}