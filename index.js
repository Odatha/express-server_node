const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

const hostname = "localhost";
const port = 3000;

const app = express(); //use express module
app.use(morgan("dev")); //print out additional information to the screen
app.use(bodyParser.json()); //whenever you need to use middleware you say app.use

app.use("/dishes", dishRouter); //mount the router,any request coming to the dishes end point will handle by the dishRrrouter
app.use("/dishes/:dishId", dishRouter);
app.use("/promotions", promoRouter);
app.use("/promotions/:promoId", promoRouter);
app.use("/leaders", leaderRouter);
app.use("/leaders/:leaderId", leaderRouter);

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
