// Constant contains class name to show/hide error messages (bootstrap built-in)
const INVALID_CLASS_NAME = 'is-invalid'

const fromCityInput = document.getElementById('city-from')
const toCityInput = document.getElementById('city-to')
const departureDateInput = document.getElementById('departure-date')

const cityNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
const dateRegex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i

const validateInput = (input, regex) => {
    return regex.test(input)
}

const handleErrorMessageShowingAndHiding = (inputField, isValidInput) => {
    const containsInvalidClass = inputField.classList.contains(INVALID_CLASS_NAME)

    if(!isValidInput && !containsInvalidClass) {
        // Show error message if input is incorrect
        inputField.classList.add(INVALID_CLASS_NAME)
    } else if(isValidInput && containsInvalidClass) {
        // Hide error message if input is correct
        inputField.classList.remove(INVALID_CLASS_NAME)
    }
}

// When user corrects their mistake, remove error message for a given field immediately
const handleInputChange = (inputField, newInput, validationRegex) => {
    // In case there are no invalid classes on this input, don't validate new input (no need)
    if(!inputField.classList.contains(INVALID_CLASS_NAME)) {
        return
    }

    // In case input is a valid city name, remove error text (if exists)
    if(validateInput(newInput, validationRegex)) {
        inputField.classList.remove(INVALID_CLASS_NAME)
    }
}

// If invalid input and user left this field, then show error message to user
const handleInputBlur = (inputField, validationRegex) => {
    const isValidInput = validateInput(inputField.value, validationRegex)

    handleErrorMessageShowingAndHiding(inputField, isValidInput)
}



document.addEventListener('DOMContentLoaded', function () {
    /* Remove error messages when new input meets requirements */
    fromCityInput.addEventListener('input', (e) => {
        handleInputChange(fromCityInput, e.target.value, cityNameRegex)
    })

    toCityInput.addEventListener('input', (e) => {
        handleInputChange(toCityInput, e.target.value, cityNameRegex)
    })

    departureDateInput.addEventListener('input', (e) => {
        handleInputChange(departureDateInput, e.target.value, dateRegex)
    })

    /* Show error messages when new input does not meet requirements */
    fromCityInput.addEventListener('blur', () => {
        handleInputBlur(fromCityInput, cityNameRegex)
    })

    toCityInput.addEventListener('blur', () => {
        handleInputBlur(toCityInput, cityNameRegex)
    })

    departureDateInput.addEventListener('blur', () => {
        handleInputBlur(departureDateInput, dateRegex)
    })
});

const validateAllInput = () => {
    let isValidDate = true

    const date = new Date(departureDateInput.value)

    if(date < new Date()) {
        isValidDate = false
    }

    const isFromCityInputValid = validateInput(fromCityInput.value, cityNameRegex)
    const isToCityInputValid = validateInput(toCityInput.value, cityNameRegex)
    const isDepartureDateInputValid = validateInput(departureDateInput.value, dateRegex) && isValidDate

    handleErrorMessageShowingAndHiding(fromCityInput, isFromCityInputValid)
    handleErrorMessageShowingAndHiding(toCityInput, isToCityInputValid)
    handleErrorMessageShowingAndHiding(departureDateInput, isDepartureDateInputValid)

    return (
        isFromCityInputValid
        && isToCityInputValid
        && isDepartureDateInputValid
        && isValidDate
    )
}

export {
    validateAllInput
}