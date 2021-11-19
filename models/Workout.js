const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date()
  },
  exercises: {
    type: Array
  }
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
