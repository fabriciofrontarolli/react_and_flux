const mongoose = require("mongoose");

const Task = mongoose.Schema({
		label: String,
		complete: Boolean
}, {
	timestamps: true
});

module.exports.Task = mongoose.model("Task", Task);
