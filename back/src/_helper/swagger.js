var express = require('express');
var swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
var config = require('../config');
// var YAML = require('yamljs');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'someone',
            url: 'https://google.com',
        },
    },
    servers: [
        {
            url: `http://localhost:${config.port}`,
            description: 'Development server',
        },
    ],
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['../api/routes/*/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const app = express.Router();
// const swaggerDocument = YAML.load(__dirname+ '/swagger.yaml');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
