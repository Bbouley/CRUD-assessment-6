/**
 * Created by Penguin on 10/26/15.
 */
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE authors (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT)');
query.on('end', function() { client.end(); });
