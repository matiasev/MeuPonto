const app = require("../src/app")
const http = require("http")

const port = 5000

const server = http.createServer(app)

server.listen(port)

console.log('Port: ' + port);