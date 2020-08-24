require('dotenv').config();


/* -----[ Dependencies ]----- */
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')


/* -----[ Middlewares ]----- */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'))
app.use(express.static('dist'))


/* -----[ Required Routes ]----- */
const travelRoutes = require('./routes/travel')


/* -----[ Routing ]----- */
// Index Route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Travel related routes
app.use('/travel', travelRoutes)


/* -----[ Server ]----- */
app.listen(process.env.PORT, function () {
    console.log(`Application is listening on port: ${process.env.PORT}!`)
})
