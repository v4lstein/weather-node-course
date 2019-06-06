

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1aa854423b7b7679738fb27ee6ad4627/${latitude},${longitude}?units=si&`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of precipitations.`)
        }
    })
}

module.exports = forecast