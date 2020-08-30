import { validateAllInput } from './js/form-validator'
import { handleSubmission } from './js/form-submission'
import { handleRetrievedTrip, saveViewedTrip, deleteSavedTrip } from './js/trip-manager'
import { viewTripCard, hideViewedTripCard } from './js/viewed-trip';
import { addSavedTripCard, setSavedTripCards } from './js/saved-trips'
import { saveTripsToLocalStorage, loadTripsFromLocalStorage } from './js/local-storage-manager'

// Import bootstrap javascript files
import 'bootstrap'

// Importing all css files
import './styles/custom.scss'
import './styles/defaults.scss'
import './styles/header.scss'
import './styles/base.scss'
import './styles/slide-show.scss'
import './styles/decorators.scss'
import './styles/footer.scss'

// Import fontawesome
import '@fortawesome/fontawesome-free/js/all.min.js'

export {
    validateAllInput,
    handleSubmission,
    handleRetrievedTrip,
    saveViewedTrip,
    deleteSavedTrip,
    viewTripCard,
    hideViewedTripCard,
    addSavedTripCard,
    setSavedTripCards,
    saveTripsToLocalStorage,
    loadTripsFromLocalStorage,
}