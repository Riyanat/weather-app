const fetch = require("node-fetch");
const logger = require("./../util/logger");
const moment = require("moment");

module.exports = () => {
    let api = "http://api.openweathermap.org/data/2.5/forecast?APPID=cb2971e0a59e4134fe80e76dcd5449be";

    return {
        /**
         * Retrieves a 3-hour weather forecast given the id of a city.
         * @param id. The id of the city.
         */
        getWeather: (id) => {
            let url = `${api}&id=${id}`;
            logger.info(`operation=getWeather. request=` + url);

            return fetch(url).then(res => {
                let statusCode = res.status;

                    if (statusCode != 200) {
                        throw new Error(`Failed to retrieve weather forecast. statusCode=${statusCode}`);
                    }

                    return res.json().then(response => {
                        logger.info("operation=getWeather. successful");

                        // retrieves only todays forecast (if any - depends on the query time).
                        return response.list
                            .filter(d => {return (d.dt <= moment().endOf('day').valueOf()/1000)})
                            .map(d => {
                                return {
                                    date: d.dt_txt,
                                    timestamp: d.dt,
                                    temperature: d.main.temp,
                                    wind: d.wind,
                                    icon: d.weather[0].icon,
                                    precipitation: d.rain["3h"] || 0
                                }
                        });
                    });
                }).catch(error => {
                    logger.error("operation=getWeather.", {error});
                    throw error;
            })
        }
    }
}