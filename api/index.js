const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

const app = express(feathers());

// eslint-disable-next-line dot-notation
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '../server/config/');
const configuration = require('@feathersjs/configuration');
app.configure(configuration());

// const authentication = require('./authentication');
const services = require('./services');
const appHooks = require('./app.hooks');

const sequelize = require('./sequelize');

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
app.use(express.errorHandler());

app.hooks(appHooks);
app.setup();

export default app;
