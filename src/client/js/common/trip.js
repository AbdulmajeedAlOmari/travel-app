
class Trip {

    constructor(id, fromCity, toCity, toCityImageURL, toCountryName, departureDate, temperatureList) {
        this.id = id
        this.fromCity = fromCity
        this.toCity = toCity
        this.toCityImageURL = toCityImageURL
        this.toCountryName = toCountryName
        this.departureDate = departureDate
        this.temperatureList = temperatureList
    }
}

export {
    Trip
}