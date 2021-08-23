const express = require("express");
const Family = require("../models/family");
const authenticate = require("../authenticate");
const cors = require("./cors");

const choreRouter = express.Router();

choreRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("GET Chores requested by:", req.user._id);
    Family.findById(req.user.family)
      .then((family) => {
        //console.log("GET family: ", family);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(family.chore);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyParent,
    (req, res, next) => {
      //Family.findById(req.user.family)
      Family.findByIdAndUpdate(
        { _id: req.user.family },
        { $push: { chore: req.body } },
        { new: true }
      )
        //.then((family) => {
        //  console.log(req.body);
        //  family.chore.push(req.body);
        //  family.save();
        //})
        .then((family) => {
          console.log("Chore Created: ", family.chore[family.chore.length - 1]);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.json(family.chore[family.chore.length - 1]);
          res.json(family.chore);
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
      res.end("PUT operation not supported on /chores");
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

choreRouter
  .route("/:choreId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("User: ", req.user);
    console.log("choreId: ", req.params.choreId);
    Family.findById(req.user.family)
      .then((family) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(family.chore.id(req.params.choreId));
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /chores/${req.params.choreId}`);
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    console.log("choreId: ", req.params.choreId);
    console.log("put body: ", req.body);
    Family.findOneAndUpdate(
      { _id: req.user.family, "chore._id": req.params.choreId },
      {
        $set: {
          "chore.$.name": req.body.name,
          "chore.$.completed": req.body.completed,
        },
      },
      { new: true }
    )
      .then((family) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        //res.json(family.chore.id(req.params.choreId));
        res.json(family.chore);
      })
      .catch((err) => next(err));
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyParent,
    (req, res, next) => {
      Family.findOneAndUpdate(
        { _id: req.user.family },
        { $pull: { chore: { _id: req.params.choreId } } },
        { new: true }
      )
        .then((family) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(family.chore);
        })
        .catch((err) => next(err));
    }
  );

module.exports = choreRouter;
