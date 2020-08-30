import axios from 'axios'

const INVISIBLE_CLASS_NAME = 'd-none'

const viewTripSubmitButton  = document.getElementById('view-trip-button');
const fromCityInput         = document.getElementById('city-from')
const toCityInput           = document.getElementById('city-to')
const departureDateInput    = document.getElementById('departure-date')
const errorMessageAlertBox  = document.getElementById('error-message-alert-box')

/* Helper Functions */
const disableViewTripButton = () => {
    viewTripSubmitButton.disabled = true
    viewTripSubmitButton.innerHTML = '<div class="spinner-border text-light" role="status"><span class="sr-only">Loading...</span></div>'
}

const enableViewTripButton = () => {
    viewTripSubmitButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i><br/>View Trip'
    viewTripSubmitButton.disabled = false
}

const showErrorMessage = (errorMessage) => {
    errorMessageAlertBox.innerText = errorMessage

    const isErrorHidden = errorMessageAlertBox.classList.contains(INVISIBLE_CLASS_NAME)

    if(isErrorHidden) {
        errorMessageAlertBox.classList.remove(INVISIBLE_CLASS_NAME)
    }
}

const hideErrorMessage = () => {
    const isErrorHidden = errorMessageAlertBox.classList.contains(INVISIBLE_CLASS_NAME)

    if(!isErrorHidden) {
        errorMessageAlertBox.classList.add(INVISIBLE_CLASS_NAME)
    }
}

//
const handleSubmission = async (event) => {
    // Prevent default POST behaviour
    event.preventDefault()

    if(!Client.validateAllInput()) {
        // Prevent user from submission
        return
    }

    // Disable 'View Trip' button to prevent multiple requests go to backend simultaneously
    disableViewTripButton()

    axios.get('/travel',{
        params: {
            cityName: toCityInput.value
        }
    })
    .then(response => response.data)
    .then(data => {

        if(data.errorMessage) {
            // Show error message if any
            showErrorMessage(data.errorMessage)
            enableViewTripButton()
            return
        }

        hideErrorMessage()

        const { cityName, countryName, imageURL, lat, lng, arrayOfTemperatures } = data

        // TODO: Use lat and lng later in a map

        Client.handleRetrievedTrip(
            {
                fromCity: fromCityInput.value,
                toCity: cityName,
                toCityImageURL: imageURL ? imageURL : 'https://img.freepik.com/free-vector/modern-city-skyline-background_77417-791.jpg?size=626&ext=jpg',
                toCountryName: countryName,
                departureDate: departureDateInput.value,
                arrayOfTemperatures
            }
        )

        // Enable 'View Trip' button again for user to allow them to inquire for another city
        enableViewTripButton()
    })
    .catch(e => {
        enableViewTripButton()
    })
}

export {
    handleSubmission
}