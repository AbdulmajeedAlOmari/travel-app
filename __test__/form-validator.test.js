const { validateAllInput } = require('../src/client/js/form-validator')

describe('Testing form-validator', () => {

    test('Testing validateAllInput definition', () => {
        expect(validateAllInput).toBeDefined()
    })
})
