//Express
var app, express, fs, server;

express = require('express');

fs = require('fs');

server = null;

app = express();

app.use(express["static"](__dirname + '/../public'));

app.get('/', function(req, res) {
  return fs.readFile('/../public/index.html', 'binary', function(err, file) {
    res.writeHead(200);
    res.write(file, 'binary');
    return res.end();
  });
});

server = app.listen(8000);

console.log("server started on port 8000");

module.exports = {
  stop: function() {
    return server.close();
  }
};
