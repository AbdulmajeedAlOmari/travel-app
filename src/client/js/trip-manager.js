
// ID prefix of trips
const TRIP_ID_PREFIX = 'trip-'

// Currently viewed trip (initially none)
let viewedTrip = null

// List of saved trips
const savedTrips = []


/* Helper Methods */
// Generate IDs for current not saved trip
const generateTripID = () => {
    return TRIP_ID_PREFIX + (savedTrips.length + 1)
}

const onPageLoad = () => {
    const loadedTripsFromStorage = Client.loadTripsFromLocalStorage()

    // In case there are no trips loaded from local storage, return
    if(!loadedTripsFromStorage) {
        return
    }

    // Add all loaded trips from local-storage to savedTrips array
    loadedTripsFromStorage.forEach(loadedTrip => {
        savedTrips.push(loadedTrip)
    })

    // Show saved trips to user
    Client.setSavedTripCards(loadedTripsFromStorage)
}

/* Action Methods */
// Temporarily save and show trip to user
const handleRetrievedTrip = (trip) => {
    // Set trip ID
    trip.id = generateTripID()

    // Save viewed trip to be used later
    viewedTrip = trip

    Client.viewTripCard(trip)
}


const saveViewedTrip = () => {
    savedTrips.push(viewedTrip)

    // Hide currently viewed trip
    Client.hideViewedTripCard()

    // Add saved trip to the tab
    Client.addSavedTripCard(viewedTrip)

    // Save all trips to localstorage
    Client.saveTripsToLocalStorage(savedTrips)

    viewedTrip = null
}

const deleteSavedTrip = (toBeDeletedTrip) => {

    // Delete from savedTrips list
    for(let i = 0; i < savedTrips.length; i++) {
        if(savedTrips[i].id === toBeDeletedTrip.id) {
            savedTrips.splice(i, 1)
            break
        }
    }

    // Save all trips to localstorage
    Client.saveTripsToLocalStorage(savedTrips)
}

// When the page is loaded (or refreshed), get saved trips from local-storage
window.addEventListener('load', onPageLoad)

export {
    handleRetrievedTrip,
    saveViewedTrip,
    deleteSavedTrip,
}