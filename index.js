const http = require('http');
const fs = require('fs');
const path = require('path');
const { createServer } = require('node:http');
const hostname = 'localhost';
const port = 8080;
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  // Using the file access system to navigate pages
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) { // send to 404 page
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        res.end(data);
      });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      fs.readFile(filePath, (err, data) => {
        res.end(data);
      });
    }
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});