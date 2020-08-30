const { saveTripsToLocalStorage, loadTripsFromLocalStorage } = require('../src/client/js/local-storage-manager')

describe('Testing local-storage-manager', () => {

    test('Testing saveTripsToLocalStorage definition', () => {
        expect(saveTripsToLocalStorage).toBeDefined()
    })

    test('Testing loadTripsFromLocalStorage definition', () => {
        expect(loadTripsFromLocalStorage).toBeDefined()
    })

    test('Saving a trip in local storage', () => {
        const dummyTrips = [{ id:1, fromCity: 'Jeddah', toCity: 'Riyadh' }]
        saveTripsToLocalStorage(dummyTrips)
        const currentLocalStorage = loadTripsFromLocalStorage()
        expect(currentLocalStorage.length).toBeGreaterThan(0)
    })
})