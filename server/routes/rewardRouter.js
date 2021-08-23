const express = require("express");
const Family = require("../models/family");
const authenticate = require("../authenticate");
const cors = require("./cors");

const rewardRouter = express.Router();

rewardRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("GET Rewards requested by:", req.user._id);
    Family.findById(req.user.family)
      .then((family) => {
        //console.log("GET family: ", family);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(family.reward);
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
        { $push: { reward: req.body } },
        { new: true }
      )
        //.then((family) => {
        //  console.log(req.body);
        //  family.reward.push(req.body);
        //  family.save();
        //})
        .then((family) => {
          console.log("Reward Created: ", family.reward[family.reward.length - 1]);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.json(family.reward[family.reward.length - 1]);
          res.json(family.reward);
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
      res.end("PUT operation not supported on /rewards");
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

rewardRouter
  .route("/:rewardId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("User: ", req.user);
    console.log("rewardId: ", req.params.rewardId);
    Family.findById(req.user.family)
      .then((family) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(family.reward.id(req.params.rewardId));
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /rewards/${req.params.rewardId}`);
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.user.parent == false && req.body.completed != "pending") {
      res.statusCode = 403;
      res.end(`This is a parent only operation!`);
    } else {
      console.log("rewardId: ", req.params.rewardId);
      console.log("put body: ", req.body);
      Family.findOneAndUpdate(
        { _id: req.user.family, "reward._id": req.params.rewardId },
        {
          $set: {
            "reward.$.name": req.body.name,
            "reward.$.completed": req.body.completed,
            "reward.$.points": req.body.points
          },
        },
        { new: true }
      )
        .then((family) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.json(family.reward.id(req.params.rewardId));
          res.json(family.reward);
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
        { $pull: { reward: { _id: req.params.rewardId } } },
        { new: true }
      )
        .then((family) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(family.reward);
        })
        .catch((err) => next(err));
    }
  );

module.exports = rewardRouter;
