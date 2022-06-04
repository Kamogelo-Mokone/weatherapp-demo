const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();
const weatherData = require('../Utilities/weatherData');

const port = process.env.PORT || 8080

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wpr252 Weather Application'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "Please enter a zip Code"
        })
    }

    weatherData(address, (error, { temperature, description, cityName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});


app.get("*", (req, res) => {
    res.render('404', {
        title: "Page not found"
    })
})


app.listen(port, () => {
    console.log("Server running on port:", port);
})