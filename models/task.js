var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var taskSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: ObjectId,
        ref: "Soldier",
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);