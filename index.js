const http = require('http');
const fs = require('fs');
const path = require('path');
const { createServer } = require('node:http');
const hostname = 'localhost';
const port = 8080;
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Check if the requested file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Send 404 response for non-existing files
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        if (err) {
          // Handle the error when reading the 404.html file
          console.error('Error reading 404.html:', err);
          res.end('Internal Server Error');
        } else {
          res.end(data);
        }
      });
    } else {
      // Serve existing files
      if (path.extname(filePath) === '.css') {
        // Set the correct content type for CSS files
        res.setHeader('Content-Type', 'text/css');
      }
      fs.createReadStream(filePath).pipe(res);
    }
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});