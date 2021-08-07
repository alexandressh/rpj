const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(methodOverride(function(req, resp) {
//     if(req.body && typeof req.body === 'object' && '_method' in req.body) {
//         const method = req.body._method;
//         delete req.body._method;
//         return method;
//     }
// }));

// app.use('/estatico', express.static('src/app/public'));

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;