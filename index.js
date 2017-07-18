
const express = require('express')
const app = express()

app.use(express.static('app'))

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

/*
const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 1337;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/