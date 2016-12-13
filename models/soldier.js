var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bcrypt = require("bcrypt");

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
    subordinates: [{
        type: ObjectId,
        ref: "Soldier"
    }],
    tasks: [{
        type: ObjectId,
        ref: "Task"
    }]
});

soldierSchema.pre("save", function (next) {
    var user = this;
    if(!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

soldierSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

soldierSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model("Soldier", soldierSchema);