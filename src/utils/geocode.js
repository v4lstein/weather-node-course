const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmFmZnkxNiIsImEiOiJjandqZXhqZWYwNmcwNDhxcDZ4eThxa2NiIn0.K_syL0NfGgx1izGZhcQ23A&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unble to connect to location services', undefined)
        } else if (body.features.length === 0 || body.message) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const location = body.features[0]
            const locationName = body.features[0].place_name
            const latitude = location.center[1]
            const longitude = location.center[0]
            callback(undefined, {
                latitude,
                longitude,
                location: locationName
            })
        }
    })
}

module.exports = geocode