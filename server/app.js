const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const YAML = require('yamljs');
const app = express();
const PORT = 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument =  YAML.load('./api.yaml');
const logger = require('./util/logger');

const forecastHandler = require('./web-handlers/forecast-handler');
const cityHandler = require('./web-handlers/city-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/forecast', forecastHandler)
app.get('/api/cities', cityHandler)

var server = app.listen(process.env.PORT || PORT, () => {
  logger.info('Running weather-svc. listening=%s', PORT)
});

module.exports = {
  tearDown: () => {
      server.close();
  }
};

