const express = require('express');
const swaggerUi = require('swagger-ui-express');

const YAML = require('yamljs');

const app = express.Router();
const swaggerDocument = YAML.load(__dirname+ '/../swagger.yaml');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
