const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    let filename = path.resolve(__dirname, './../static/cities.json');
    let file = fs.readFileSync(filename, 'utf8');
    let cities = JSON.parse(file);

    cities = cities.map(c =>  {
        return {
            id:c.id,
            city: c.name,
            country: c.country
        }
    });
    res.status(200).send(cities);
};
