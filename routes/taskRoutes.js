var express = require("express");
var taskRouter = express.Router();
var Task = require("../models/task");

taskRouter.route("/")
    .get(function (req, res) {
        Task.find({
            creator: req.user._id
        }, function (err, tasks) {
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
        console.log("taskRoutes.js delete");
        console.log(req.body);
        Task.findOneAndRemove({
            _id: req.params.taskId,
            creator: req.user._id
        }, function (err, deletedTask) {
            if (err) return res.status(500).send(err);
            res.send(deletedTask);
        });
    });

module.exports = taskRouter;