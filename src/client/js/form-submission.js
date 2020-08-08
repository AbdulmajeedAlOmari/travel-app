const handleSubmission = (event) => {
    // Prevent default POST behaviour
    event.preventDefault()

    if(!Client.validateAllInput()) {
        // Prevent user from submission
        return
    }

    // TODO: send input to backend
}

export {
    handleSubmission
}