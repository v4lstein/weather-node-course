const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'WeatherApp',
        name: 'v4lstein'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'v4lstein'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'v4lstein',
        message: 'If you need help, contact me!'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.location) {
        geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                
                res.send({
                    query: req.query.location,
                    location,
                    forecastData
                })
              })
        })
    } else {
        res.send({
            error: 'You must provide a location'
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: '404',
        name: 'v4lstein',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: '404',
        name: 'v4lstein',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`)
})

