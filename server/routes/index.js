var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname,'../', '../', 'config'));

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
