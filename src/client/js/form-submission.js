import { validateAllInput } from './form-validator'

document.addEventListener('submit', (e) => {
    // Prevent default POST behaviour
    e.preventDefault()

    if(!validateAllInput()) {
        // Prevent user from submission
        return
    }

    // TODO: send input to backend
})