/**
 * @jest-environment node
 */
const app = require('../src/server/app')
const request = require('supertest')

const TEST_CITY_NAME = 'Riyadh'
const TEST_CITY_LAT = '24.68773'
const TEST_CITY_LNG = '46.72185'

describe('Test API', () => {
    test(`Returns destination details endpoint for ${TEST_CITY_NAME} city correctly`, async () => {
        const response = await request(app).get(`/travel?cityName=${TEST_CITY_NAME}`)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)

        const { body } = response
        expect(body.lat).toBe(TEST_CITY_LAT)
        expect(body.lng).toBe(TEST_CITY_LNG)
    })
})

