require('dotenv').config();

const express = require('express')
const app = express()

app.use(express.static('dist'))


/* Index Route */
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.listen(process.env.PORT, function () {
    console.log(`Application is listening on port ${process.env.PORT}!`)
})
