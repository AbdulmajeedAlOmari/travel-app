const app = require('./app')

/* -----[ Server ]----- */
app.listen(process.env.PORT, function () {
    console.log(`Application is listening on port: ${process.env.PORT}!`)
})