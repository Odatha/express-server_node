const express = require("express");
const http = require("http");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express(); //use express module
app.use(morgan("dev")); //print out additional information to the screen

app.use(express.static(__dirname + "/public")); //express you will look up root of this project

app.use((req, res, next) => {
  //next is used to invoke additional middleware

  res.statusCode = 200;
  res.setHeader("Content-type", "text/html");
  res.end("<html><body><h1>This is an express server</h1></body></html>");
});

const server = http.createServer(app); //setup the server

server.listen(port, hostname, () => {
  console.log(`server runnig at http://${hostname}:${port}`);
});
