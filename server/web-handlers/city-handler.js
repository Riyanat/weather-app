const cityMapper = require("./../lib/city-mapper");
module.exports = (req, res) => {
    var result = cityMapper.getAvailableCities()
        .map(c => {
        return {
            id: c.id,
            name: c.name,
            country: c.country
        }
    }).slice(0, 1000);

    res.status(200).send({result})
};