const FlightapiControllers = require('../controllers/flightapi.controllers');
const multer = require('multer');

module.exports = (app) => {
    app.post('/flightapi/authenticationApi', FlightapiControllers.authenticationApi);
    
    
    
}