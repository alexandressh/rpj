const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;