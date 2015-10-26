/**
 * Created by Penguin on 10/26/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname,'../', '../', 'config'));


//get all authors
router.get('/authors', function(req, res){
    var results = [];

    pg.connect(connectionString, function(err, client, done){
       if(err) {
           done();
           console.log(err);
           return res.status(500).join({ success:false, data: err});
       }

        var query = client.query('SELECT * FROM authors ORDER BY id ASC;');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        })
    });
});


//get single authors
router.get('/author/:id', function(req, res){
    var results = [];

    var data = {id: req.params.id};

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            console.log(err);
            return res.status(500).join({ success:false, data: err});
        }

        var query = client.query('SELECT * FROM authors WHERE id =($1);', [data.id]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            res.json(results);
        });

    });
});

//post to all authors
router.post('/authors', function(req, res) {
    var results = [];

    var data = {first_name: req.body.first_name, last_name: req.body.last_name};

    console.log(data);

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            console.log(err);
            return res.status(500).join({ success: false, data: err});
        }

        client.query('INSERT INTO authors (first_name, last_name) values($1, $2)', [data.first_name, data.last_name]);

        var query = client.query('SELECT * FROM authors ORDER BY id ASC;');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});


//put to single author
router.put('/author/:id', function(req, res) {
    var results = [];

    var id = req.params.id;

    var data = {first_name: req.body.first_name, last_name: req.body.last_name};

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            console.log(err);
            return res.status(500).send(json({ success:false, data: err }));
        }

        client.query('UPDATE authors SET first_name=($1), last_name=($2) WHERE id = ($3);', [data.first_name, data.last_name, id]);

        var query = client.query('SELECT * FROM authors ORDER BY id ASC;');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
});


//delete single author
router.delete('/author/:id', function(req, res) {
    var results = [];

    var id = req.params.id;

    pg.connect(connectionString, function(err, client, done) {
       if(err) {
           done();
           console.log(err);
           return res.status(500).send(json({success:false, data: err}));
       }

       client.query('DELETE FROM authors WHERE id=($1);', [id]);

       var query = client.query('SELECT * FROM authors ORDER BY id ASC');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

module.exports = router;