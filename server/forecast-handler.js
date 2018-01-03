let fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
let filename = path.resolve(__dirname, './../static/cities.json');
let file = fs.readFileSync(filename, 'utf8');
let cities = JSON.parse(file);

let map = cities.reduce((map, c) =>  {
    map[c.id] = {
        lon: c.coord.lon,
        lat: c.coord.lat
    };
    map[c.name] = {
        lon: c.coord.lon,
        lat: c.coord.lat
    };
    return map;
}, {});

console.log(map);

const forecastHandler = (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let country = req.query.country;

    let api = "http://api.openweathermap.org/data/2.5/forecast?APPID=cb2971e0a59e4134fe80e76dcd5449be";
    let url = api;

    if(id) {
        url += `&id=${id}`;
    }
    else if (name && country) {
        url += `&q=${name},${country}`;
    }
    else if (name) {
        url += `&q=${name}`;
    } else {
        res.status(400)
            .send({cod: 400, message: "city or id must be provided."});
    }



    logger.info(`retrieving today's forecast`, url);
    fetch(url).then(response => {
        return response.json().then(data => {
            https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400
            // if (response.status != 200) {
            //forecast.list.filter(d => return d.dt >= );
            data = data.list.map(d => {
                return {
                    date:d.dt_txt,
                    timestamp: d.dt,
                    temperature: d.main.temp,
                    wind: d.wind,
                    icon: d.weather[0].icon,
                    precipitation: d.rain,
                    sunrise:"",
                    sunset: ""
                }
            });
            res.status(response.status).send(data);
            return;
            //}

        }).catch(err => {
            logger.error("an error occurred", err);
            res.status(500).send({cod: 500, message: 'internal error occurred'});
        });
    })
        .catch(err => {
            logger.error("an error occurred", err);
            res.status(500).send({cod: 500, message: 'internal error occurred'});
        });

}

module.exports = forecastHandler;