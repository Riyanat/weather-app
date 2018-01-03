const winston = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const YAML = require('yamljs');
const app = express();
const PORT = 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument =  YAML.load('./api.yaml');

const cityHandler = require('./server/city-handler');
const forecastHandler = require('./server/forecast-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

logger = new (winston.Logger)
({transports: [new winston.transports.Console()]});

app.get('/api/cities', cityHandler);
app.get('/forecast', forecastHandler)

app.listen(PORT, () => {
  logger.info('Running weather-svc. listening=%s', PORT)
});

