var express = require("express");
var soldierRouter = express.Router();
var Soldier = require("../models/soldier");

soldierRouter.route("/leaders")
    .get(function (req, res) {
        Soldier.find({isLeader: true}, function (err, soldiers) {
            if (err) return res.status(500).send(err);
            res.send(soldiers);
        });
    });

soldierRouter.route("/me")
    .get(function (req, res) {
        Soldier.findById(req.user._id, function (err, soldier) {
            if (err) return res.status(500).send(err);
            if (!soldier) return res.status(400).send("No soldier found.");
            else res.send(soldier);
        });
    })
    .put(function (req, res) {
        Soldier.findOneAndUpdate({
            _id: req.params._id,
        }, req.body, {
            new: true
        }, function (err, updatedSoldier) {
            if (err) return res.status(500).send(err);
            res.send(updatedSoldier);
        });
    })
    .delete(function (req, res) {
        Soldier.findOneAndRemove({_id: req.user._id}, function(err, deletedSoldier) {
            if (err) return res.status(500).send(err);
            res.send(deletedSoldier);
        });
    });

soldierRouter.route("/me/subordinates")
    .get(function (req, res) {
        Soldier.find({
            leader: req.user._id
        })
        .populate("subordinates")
        .exec(function (err, subordinates) {
            if (err) return res.status(500).send(err);
            res.send(subordinates);
        });
    });

module.exports = soldierRouter;