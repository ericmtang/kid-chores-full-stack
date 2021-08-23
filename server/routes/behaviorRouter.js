const express = require("express");
const Family = require("../models/family");
const authenticate = require("../authenticate");
const cors = require("./cors");

const behaviorRouter = express.Router();

behaviorRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("GET Behaviors Requested by:", req.user._id);
    Family.findById(req.user.family)
      .then((family) => {
        //console.log("GET family: ", family);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(family.behavior);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    (req, res, next) => {
      //Family.findById(req.user.family)
      Family.findByIdAndUpdate(
        { _id: req.user.family },
        { $push: { behavior: req.body } },
        { new: true }
      )
        //.then((family) => {
        //  console.log(req.body);
        //  family.behavior.push(req.body);
        //  family.save();
        //})
        .then((family) => {
          console.log("Behavior Created: ", family.behavior[family.behavior.length - 1]);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.json(family.behavior[family.behavior.length - 1]);
          res.json(family.behavior);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /behaviors");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Family.deleteMany()
        .then((family) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(family);
        })
        .catch((err) => next(err));
    }
  );

behaviorRouter
  .route("/:behaviorId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("User: ", req.user);
    console.log("behaviorId: ", req.params.behaviorId);
    Family.findById(req.user.family)
      .then((family) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(family.behavior.id(req.params.behaviorId));
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /behaviors/${req.params.behaviorId}`);
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.user.parent == false && req.body.completed != "pending") {
      res.statusCode = 403;
      res.end(`This is a parent only operation!`);
    } else {
      console.log("behaviorId: ", req.params.behaviorId);
      console.log("put body: ", req.body);
      Family.findOneAndUpdate(
        { _id: req.user.family, "behavior._id": req.params.behaviorId },
        {
          $set: {
            "behavior.$.name": req.body.name,
            "behavior.$.completed": req.body.completed,
            "behavior.$.points": req.body.points
          },
        },
        { new: true }
      )
        .then((family) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.json(family.behavior.id(req.params.behaviorId));
          res.json(family.behavior);
        })
        .catch((err) => next(err));
    }
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyParent,
    (req, res, next) => {
      Family.findOneAndUpdate(
        { _id: req.user.family },
        { $pull: { behavior: { _id: req.params.behaviorId } } },
        { new: true }
      )
        .then((family) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(family.behavior);
        })
        .catch((err) => next(err));
    }
  );

module.exports = behaviorRouter;
