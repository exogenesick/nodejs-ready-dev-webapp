var indexController = {};

indexController.index = function(req, res, next) {
    var name = req.params.name;

    if (!name) {
        name = 'nobody';
    }

    res.render('index', { name: name });
};

module.exports = indexController;
