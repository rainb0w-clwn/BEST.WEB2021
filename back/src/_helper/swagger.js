var express = require('express');
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');

const app = express.Router();
const swaggerDocument = YAML.load(__dirname+ '/swagger.yaml');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
