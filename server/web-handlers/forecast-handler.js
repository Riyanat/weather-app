const cityMapper = require('../lib/city-mapper');
const twilightClient = require('../lib/twilight-client')();
const weatherClient = require('../lib/weather-client')();
const logger = require('../util/logger');

const forecastHandler = async(req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let country = req.query.country;

    // Either an id OR name,country pair must be provided.
    if (!id && !(name && country)){
        res.status(400)
            .send({cod: 400, message: "Provide a valid city and country OR a valid city id"});
    }

    // Retrieve id from name, country.
    if ((name && country) && cityMapper.cityExists(name, country)) {
        id = cityMapper.getId(name, country);
    }
    else {
        res.status(404)
            .send({cod: 404, message: "Provide a known city and country"});
    }

    // Validate Id
    if (id && !cityMapper.idExists(id)) {
        res.status(404)
            .send({cod: 404, message: "Provide a known id"});
    }

    let weather = weatherClient.getWeather(id);
    let sunriseSunset = twilightClient.getSunriseAndSunset(id);

    return Promise.all([weather, sunriseSunset])
        .then((results) => {
            let data = {};
            data.forecast = results[0];
            data.sunrise = results[1];
            res.status(200).send(data);
            return;
        })
        .catch(err => {
            logger.error("an error occurred", err);
            res.status(500).send({cod: 500, message: err.message});
            return;
        });
}

module.exports = forecastHandler;