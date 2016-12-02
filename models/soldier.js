var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var soldierSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    age: Number,
    phoneNumber: Number,
    email: String,
    address: String,
    isLeader: Boolean,
    leader: {
        type: ObjectId,
        ref: "Soldier"
    },
    subordinates: {
        type: [ObjectId],
        ref: "Soldier"
    },
    tasks: {
        type: [ObjectId],
        ref: "Task"
    }
});

module.exports = mongoose.model("Soldier", soldierSchema);