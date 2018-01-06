/**
 * A library that provides city info.
 * Available functions: getId, get
 */
const logger = require("./../util/logger");

module.exports = function() {
    const path = require("path");
    const fs = require("fs");
    const filename = path.resolve(__dirname, "./../../static/cities.json");

    const ids = {};
    const coords = {};
    const all = [];

    logger.info("loading city data.");

    let file = fs.readFileSync(filename, "utf8");
    let cities = JSON.parse(file);

    cities.forEach(c => {
        let lon = c.coord.lon;
        let lat = c.coord.lat;

        let id = c.id;
        let name = c.name.toLowerCase();
        let country = c.country.toLowerCase();

        ids[name + "," + country] = id;
        coords[id] = {lon, lat};

        all.push({id, name, country});
    });

    return {
        /**
         *
         * Gets the id of a city, given the city name and its country code.
         * @param name. The name of a city
         * @param country. The country of the city.
         *
         */
        getId: (name, country) => {
            return ids[name.toLowerCase() + "," + country.toLowerCase()];
        },
        /**
         *
         * Gets the longitude and latitude of the city given a city's id.
         * @param id. The id of a city
         * @returns
         */
        getCoords: (id) => {
            return coords[id];
        },

        /**
         * Checks if the city exists.
         * @param name
         * @param country
         * @returns {boolean}
         */
        cityExists: (name, country) => {
            let id = ids[name.toLowerCase() + "," + country.toLowerCase()];
            return (id != null);
        },
        /**
         *
         * Checks if the id exists.
         * @param id
         * @returns {boolean}
         */
        idExists: (id) => {
            let c = coords[id];
            return (c != null)
        }
    }
}();

