var express = require("express");
var taskRouter = express.Router();
var Task = require("../models/task");
var Soldier = require("../models/soldier");

taskRouter.route("/")
    .get(function (req, res) {
        Task.find({
            creator: req.user._id
        })
        .populate("tasks")
        .exec(function (err, tasks) {
            if (err) return res.status(500).send(err);
            res.send(tasks);
        });
    })
    .post(function (req, res) {
        var task = new Task(req.body);
        task.creator = req.user._id;
        task.save(function (err, newTask) {
            if (err) return res.status(500).send(err);
            res.status(201).send(newTask);
            Soldier.findById(req.user._id, function (err, soldier) {
                    if (err) return res.status(500).send(err);
                    soldier.tasks.push(newTask);
                    soldier.save();
            });
        });
    });

taskRouter.route("/:taskId")
    .get(function (req, res) {
        Task.findOne({
            _id: req.params.taskId,
            creator: req.user._id
        }, function (err, task) {
            if (err) return res.status(500).send(err);
            if (!todo) return res.status(400).send("No task found.");
            else res.send(todo);
        });
    })
    .put(function (req, res) {
        Task.findOneAndUpdate({
            _id: req.params.taskId,
            creator: req.user._id
        }, req.body, {
            new: true
        }, function (err, updatedTask) {
            if (err) return res.status(500).send(err);
            res.send(updatedTask);
        });
    })
    .delete(function (req, res) {
        Soldier.findOne({
            _id: req.user._id
        }, function (err, soldier) {
            if (err) return res.status(500).send(err);
            var index = soldier.tasks.indexOf(req.params.taskId);
            console.log(soldier.tasks[index]);
            soldier.tasks.splice(index, 1);
            soldier.save();
        });
        Task.findOneAndRemove({
            _id: req.params.taskId,
            creator: req.user._id
        }, function (err, deletedTask) {
            if (err) return res.status(500).send(err);
            res.send(deletedTask);
        });
    });

module.exports = taskRouter;