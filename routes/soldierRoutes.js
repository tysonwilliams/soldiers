var express = require("express");
var soldierRouter = express.Router();
var Soldier = require("../models/soldier");

soldierRouter.route("/")
    .get(function (req, res) {
        Soldier.find({
            subordinates: req.user.subordinates
        }).populate("subordinates").exec(function (err, subordinates) {
            if (err) return res.status(500).send(err);
            res.send(subordinates);
        });
    });

soldierRouter.route("/:soldierId")
    .get(function (req, res) {
        Soldier.findOne({
            _id: req.params.soldierId,
        }, function (err, soldier) {
            if (err) return res.status(500).send(err);
            if (!soldier) return res.status(400).send("No soldier found.");
            else res.send(soldier);
        });
    })
    .put(function (req, res) {
        Soldier.findOneAndUpdate({
            _id: req.params.soldierId,
        }, req.body, {
            new: true
        }, function (err, updatedSoldier) {
            if (err) return res.status(500).send(err);
            res.send(updatedSoldier);
        });
    })
    .delete(function (req, res) {
        Soldier.findOneAndRemove({
            _id: req.params.soldierId,
        }, function (err, deletedSoldier) {
            if (err) return res.status(500).send(err);
            res.send(deletedSoldier);
        });
    });

module.exports = soldierRouter;