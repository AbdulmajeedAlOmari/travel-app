// Constant contains class name to show/hide error messages
const INVALID_CLASS_NAME = 'is-invalid'

const fromCityInput = document.getElementById('city-from')
const toCityInput = document.getElementById('city-to')
const departureDateInput = document.getElementById('departure-date')

const cityNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i

const validateInput = (input, regex) => {
    return regex.test(input)
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
    const containsInvalidClass = inputField.classList.contains(INVALID_CLASS_NAME)
    const isValidInput = validateInput(inputField.value, validationRegex)

    if(!isValidInput && !containsInvalidClass) {
        // Show error message if input is incorrect
        inputField.classList.add(INVALID_CLASS_NAME)
    } else if(isValidInput && containsInvalidClass) {
        // Hide error message if input is correct
        inputField.classList.remove(INVALID_CLASS_NAME)
    }
}

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

/* Show error messages when new input meets requirements */
fromCityInput.addEventListener('blur', () => {
    handleInputBlur(fromCityInput, cityNameRegex)
})

toCityInput.addEventListener('blur', () => {
    handleInputBlur(toCityInput, cityNameRegex)
})

departureDateInput.addEventListener('blur', () => {
    handleInputBlur(departureDateInput, dateRegex)
})

const validateAllInput = () => {
    const isFromCityInputValid = validateInput(fromCityInput.value, cityNameRegex)
    const isToCityInputValid = validateInput(toCityInput.value, cityNameRegex)
    const isDepartureDateInputValid = validateInput(departureDateInput.value, dateRegex)

    return (
        isFromCityInputValid
        && isToCityInputValid
        && isDepartureDateInputValid
    )
}

export {
    validateAllInput
}