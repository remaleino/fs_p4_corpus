//Luodaan ja määritetään portti
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
    console.log('The server is running at port 3001');
});