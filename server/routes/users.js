const express = require("express");
const User = require("../models/user");
const Family = require("../models/family");
const passport = require("passport");
const authenticate = require("../authenticate");
const cors = require("./cors");
const user = require("../models/user");

const router = express.Router();

router.options("*", cors.corsWithOptions, (req, res) => res.sendStatus(200));

router.get(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find()
      .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => next(err));
  }
);

router.get(
  "/family",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyParent,
  (req, res, next) => {
    User.find({ family: req.user.family })
      .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => next(err));
  }
);

router.post("/signup", cors.corsWithOptions, (req, res) => {
  Family.create({ name: req.body.lastname })
    .then((family) => {
      console.log("Family Created ", family._id);
      //family.user.push(user._id);
      family.save();
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
          } else {
            if (req.body.firstname) {
              user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
              user.lastname = req.body.lastname;
            }
            user.parent = true;
            user.family = family._id;
            console.log("User Created:", user._id);
            console.log("User Family: ", user.family);
            user.save((err) => {
              if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({ err: err });
                return;
              }
              passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: true,
                  family: user.family,
                  status: "Registration Successful!",
                });
              });
            });
          }
        }
      );
    })
    .catch((err) => console.log(err));
});

router.post(
  "/adduser",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyParent,
  (req, res) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          if (req.body.firstname) {
            user.firstname = req.body.firstname;
          }
          if (req.body.lastname) {
            user.lastname = req.body.lastname;
          }
          if (req.body.parent == true) {
            user.parent = true;
            user.admin = true;
          } else {
            user.parent = false;
          }
          user.family = req.user.family;
          user.save((err) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
              return;
            }
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({
                success: true,
                family: user.family,
                status: "Registration Successful!",
              });
            });
          });
        }
      }
    );
  }
);

router.post(
  "/login",
  cors.corsWithOptions,
  passport.authenticate("local"),
  (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    console.log("PreLogin Request User Object: ", req.user._id);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      family: req.user.family,
      token: token,
      firstName: req.user.firstname,
      userId: req.user._id,
      isParent: req.user.parent,
      points: req.user.points,
      status: "You are successfully logged in!",
    });
  }
);

router.get("/logout", cors.corsWithOptions, (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

router.put(
  "/points",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyParent,
  (req, res, next) => {
    if (req.body.childId && req.body.points) {
      User.updateOne(
        { _id: req.body.childId },
        { $inc: { points: req.body.points } }
      )
        .then((users) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        })
        .catch((err) => next(err));
    }
  }
);

router.get(
  "/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
);

module.exports = router;
