var config = require('nconf');

module.exports = function(app) {
    // 404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // 5xx
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        var errorOutput = {};

        // dev error handler
        if ('dev' === config.get('NODE_ENV')) {
            errorOutput = err;
        }

        res.render('error', {
            message: err.message,
            error: errorOutput
        });
    });
};
