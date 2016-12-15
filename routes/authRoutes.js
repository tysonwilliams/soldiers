var express = require("express");
var authRouter = express.Router();
var Soldier = require("../models/soldier");
var jwt = require("jsonwebtoken");
var config = require("../config");

authRouter.post("/register", function (req, res) {
    Soldier.find({username: req.body.username}, function (err, existingSoldiers) {
        if (err) return res.status(500).send(err);
            console.log(existingSoldiers);
        if (existingSoldiers.length !== 0) {
            return res.status(400).send({success: false, message: "That username is already taken"});
        }
        var soldier = new Soldier(req.body);
        soldier.save(function (err, newSoldier) {
            if (err) return res.status(500).send(err);
            if (req.body.leader) {
                Soldier.findById(req.body.leader, function (err, leader) {
                    if (err) return res.status(500).send(err);
                    leader.subordinates.push(newSoldier._id);
                    leader.save();
                });
            }
            return res.send({success: true, message: "Registered a new Soldier", soldier: newSoldier});
        });
    });
});

authRouter.post("/login", function (req, res) {
    Soldier.findOne({username: req.body.username}, function (err, soldier) {
        if (err) return res.status(500).send(err);
        if (!soldier) {
            res.status(401).send({success: false, message: "Username not found."});
        } else if (soldier) {
            soldier.checkPassword(req.body.password, function (err, match) {
                if (err) throw (err);
                if (!match) res.status(401).json({success: false, message: "Incorrect password"});
                else {
                    var token = jwt.sign(soldier.toObject(), config.secret);
                    res.json({soldier: soldier.withoutPassword(), token: token, success: true, message: "Token aquired."});
                }
            });
        }
    });
});

module.exports = authRouter;