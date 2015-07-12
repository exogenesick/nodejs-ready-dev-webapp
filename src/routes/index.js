var express = require('express');
var router = express.Router();
var config = require('nconf');
var homepageController = require('./../controllers/homepage');

module.exports = function(app) {
    // homepage
    router.get('/', homepageController.index);
    router.get('/:name', homepageController.index);

    app.use('/', router);
};
