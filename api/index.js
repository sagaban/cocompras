const path = require('path');

const feathers = require('@feathersjs/feathers');
// eslint-disable-next-line dot-notation
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '../server/config/');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const cors = require('cors');
const logger = require('./hooks/logger');

const services = require('./services');
const appHooks = require('./app.hooks');
const authentication = require('./authentication');
const sequelize = require('./sequelize');

const app = express(feathers());
app.configure(configuration());

app.use(cors());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());

app.configure(sequelize);

app.configure(authentication);

app.configure(services);

// Register a nicer error handler than the default Express one
app.use(express.errorHandler({ logger }));

// Configure a middleware for 404s and the error handler
app.use(express.notFound());

app.hooks(appHooks);
app.setup();

export default app;
