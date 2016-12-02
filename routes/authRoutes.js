var express = require("express");
var authRouter = express.Router();
var Soldier = require("../models/soldier");
var jwt = require("jsonwebtoken");
var config = require("../config");

authRouter.post("/register", function (req, res) {
    console.log(req.body);
    Soldier.find({username: req.body.username}, function (err, existingSoldiers) {
        if (err) return res.status(500).send(err);
            console.log(existingSoldiers);
        if (existingSoldiers.length !== 0) {
            return res.status(400).send({success: false, message: "That username is already taken"});
        }
        var soldier = new Soldier(req.body);
        soldier.save(function (err, newSoldier) {
            if (err) return res.status(500).send(err);
            return res.send({success: true, message: "Registered a new Soldier", soldier: newSoldier});
        });
    });
});

authRouter.post("/login", function (req, res) {
    Soldier.findOne({username: req.body.username, password: req.body.password}, function (err, soldier) {
        console.log(soldier);
        if (err) return res.status(500).send(err);
        if (soldier === null) {
            return res.status(403).send({success: false, message: "Username or password provided does not match."});
        }
        var token = jwt.sign(soldier.toObject(), config.secret);
        res.send({token: token, soldier: soldier.toObject(), success: true, message: "Token aquired."});
    });
});

module.exports = authRouter;