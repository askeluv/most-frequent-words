var express = require('express');
var fs = require("fs");
var app = express();

function readJsonFileSync(filepath, encoding) {
    if (typeof(encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding); // TODO: Handle file does not exist
    return JSON.parse(file);
}

function getFile(file) {
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

app.get('/api', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.send("API is up and running...");
});

app.get('/api/:lang', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.json(getFile('data/' + req.params.lang + '.json'));
});

app.listen(process.env.PORT || 4730);