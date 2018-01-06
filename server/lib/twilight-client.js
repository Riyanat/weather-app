// the lib is only loaded once because sunrise and sunset predictions dont change.
const fetch = require('node-fetch');
const cityMapper = require('./city-mapper');
const logger = require('./../util/logger');

module.exports = () => {
    const api = "https://api.sunrise-sunset.org/json";

    return {
        getSunriseAndSunset: async (id) => {
            const coord = cityMapper.getCoords(id);
            const url = `${api}?lng=${coord.lon}&lat=${coord.lat}`;

            logger.info(`operation=getSunriseSunset request=${url}`);

            return fetch(url).then(res => {
                    let statusCode = res.status;
                    if (statusCode != 200) {
                        throw new Error(`Failed to retrieve sunrise-sunset from api statusCode=${statusCode}`);
                    }

                    return res.json().then(json => {
                        logger.info(`operation=getSunriseSunset. successful`);
                        return {
                            sunrise: json.results.sunrise,
                            sunset: json.results.sunset
                        }
                    });
                })
                .catch(error => {
                    logger.error("operation=getSunriseSunset.", {error});
                    throw error;
                });
        }
    }
}