//handling REST API endpoint sfor /dishes and /dishes:dishID
const express = require("express"); // becomes own node modules
const bodyParser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/") //take endpoint as  a parameter

  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next(); //check for additional information match to endpoint
  })
  .get((req, res, next) => {
    res.end("Will send all the dishes to you!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    res.end("Deleting all dishes");
  });

module.exports = dishRouter;
