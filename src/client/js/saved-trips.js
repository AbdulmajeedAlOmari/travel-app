
const INVISIBLE_CLASS_NAME  = 'd-none'
const savedTripsContainer   = document.getElementById('saved-trips-container')
const savedTripsGrid        = document.getElementById('saved-trips-grid')


/* Helper Functions */
const isContainerInvisible = () => {
    return savedTripsContainer.classList.contains(INVISIBLE_CLASS_NAME)
}

const handleContainerShowing = () => {
    if(isContainerInvisible()) {
        savedTripsContainer.classList.remove(INVISIBLE_CLASS_NAME)
    }
}


const handleContainerHiding = () => {
    if(!isContainerInvisible() && !savedTripsContainer.childElementCount) {
        savedTripsContainer.classList.add(INVISIBLE_CLASS_NAME)
    }
}


const generateSavedTripCard = (savedTrip) => {
    const savedTripCard = document.createElement('div')
    savedTripCard.id = savedTrip.id
    savedTripCard.classList.add('card')

    // Generate image for trip
    const savedTripCityImage = document.createElement('img')
    savedTripCityImage.src = savedTrip.toCityImageURL
    savedTripCityImage.classList.add('card-img-top')
    savedTripCityImage.alt = `${savedTrip.toCity} image`

    // Generate card body container to hold text of trip
    const savedTripCardBody = document.createElement('div')
    savedTripCardBody.classList.add('card-body')

    // Generate header text for saved trip
    const savedTripHeader = document.createElement('h5')
    savedTripHeader.innerText = `${savedTrip.toCity} - ${savedTrip.toCountryName}`

    // Generate departure date details for saved trip
    const savedTripDepartureDate = document.createElement('p')
    savedTripDepartureDate.innerHTML = `<strong>Departure date:</strong> ${savedTrip.departureDate}`

    // Generate delete button for saved trip
    const savedTripDeleteButton = document.createElement('button')
    savedTripDeleteButton.classList.add('btn', 'btn-danger')
    savedTripDeleteButton.onclick = ev => {
        Client.deleteSavedTrip(savedTrip)
        savedTripCard.parentElement.removeChild(savedTripCard)

        // When there is no elements, hide saved trips section
        handleContainerHiding()
    }
    savedTripDeleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete Trip'

    // Add image of city to card
    savedTripCard.appendChild(savedTripCityImage)

    // Add contents of card body
    savedTripCardBody.appendChild(savedTripHeader)
    savedTripCardBody.appendChild(savedTripDepartureDate)
    savedTripCardBody.appendChild(savedTripDeleteButton)

    // Add card body container to card
    savedTripCard.appendChild(savedTripCardBody)

    // Finally, return saved trip card
    return savedTripCard
}


/* Main Functions */
const addSavedTripCard = (trip) => {
    const savedTripCard = generateSavedTripCard(trip)
    savedTripsGrid.appendChild(savedTripCard)

    // When container is invisible, remove invisible class
    handleContainerShowing()
}

// Called when the page loads and has saved trips in local-storage
const setSavedTripCards = (savedTrips) => {

    // Note that there are multiple saved trips to be added
    // In order to load it once (1 reflow, 1 repaint), we need to use DocumentFragment
    const documentFragment = document.createDocumentFragment()

    savedTrips.forEach(savedTrip => {
        const savedTripCard = generateSavedTripCard(savedTrip)
        documentFragment.appendChild(savedTripCard)
    })

    // Show all saved trips cards
    savedTripsGrid.appendChild(documentFragment)

    // When container is invisible, remove invisible class
    handleContainerShowing()
}

export {
    addSavedTripCard,
    setSavedTripCards,
}