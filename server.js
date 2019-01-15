// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', (req, res) => {
    res.json({ greeting: 'hello API' })
})

// api endpoint for empty timestamp
app.get('/api/timestamp/', (req, res) => {
    res.status(400).json({
        unix: null,
        utc: 'Invalid Date',
    })
})

app.get('/api/timestamp/:date_string', (req, res) => {
    const date_string = req.params.date_string

    let date
    let response

    // date in unix (at least 10 numbers) -> 1450137600
    if (/\d{10,}$/.test(date_string)) {
        date = new Date(date_string * 1000)

        response = {
            unix: `${date.getTime()}`,
            utc: `${date.toUTCString()}`,
        }
    }
    // date in format YYYY-MM-DD -> 2019-01-01
    else if (/\d{4,}-\d{2,}-\d{2,}$/.test(date_string)) {
        date = new Date(date_string)

        response = {
            unix: `${date.getTime()}`,
            utc: `${date.toUTCString()}`,
        }
    }
    // errors in date format
    else {
        response = {
            unix: null,
            utc: 'Invalid Date',
        }
    }

    res.json(response)
})

// listen for requests :)
const PORT = process.env.PORT || 3000
const listener = app.listen(PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port)
})
