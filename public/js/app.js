


const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const search = document.querySelector('input')
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    if (location) {
        fetch(`/weather?location=${encodeURIComponent(location)}`).then((response) => {
            response.json().then(({error, location, forecastData} = {}) => {
                if (error) {
                    messageOne.textContent = error
                } else {
                    messageOne.textContent = location
                    messageTwo.textContent = forecastData
                }
            })
        })
    }
})