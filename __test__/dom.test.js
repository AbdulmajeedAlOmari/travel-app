const fromCityInput         = document.getElementById('city-from')
const toCityInput           = document.getElementById('city-to')
const departureDateInput    = document.getElementById('departure-date')


describe('Testing DOM', () => {

    test('Testing fromCityInput element definition', () => {
        expect(fromCityInput).toBeDefined();
    })

    test('Testing toCityInput element definition', () => {
        expect(toCityInput).toBeDefined();
    })

    test('Testing departureDateInput element definition', () => {
        expect(departureDateInput).toBeDefined();
    })
})