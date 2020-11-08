const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./routes/dishRouter");
const hostname = "localhost";
const port = 3000;

const app = express(); //use express module
app.use(morgan("dev")); //print out additional information to the screen
app.use(bodyParser.json()); //whenever you need to use middleware you say app.use

app.use("/dishes", dishRouter); //mount the router,any request coming to the dishes end point will handle by the dishRrrouter
app.get("/dishes/:dishId", (req, res, next) => {
  res.end("Will send details of the dish: " + req.params.dishId + " to you!");
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n");
  res.end(
    "Will update the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("Deleting dish: " + req.params.dishId);
});

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
