const router = require("express").Router();
const Workout = require("../models/Workout");
const path = require("path");
const mongoose = require('mongoose')

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.get("/api/workouts", async (req, res) => {
  try {
    let duration = await Workout.aggregate( [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" } 
        }
      }
    ]);
    res.json(duration);
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/workouts", async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.json(newWorkout);
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    const moreData = await Workout.updateOne(
      { _id: (req.params.id) },
      { $push: {exercises: req.body} },
      { new: true }
    );
    res.json(moreData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/workouts/range", async (req, res) => {
  try {
    const past = await Workout.aggregate([
      {
        $addFields: { 
          totalDuration: { $sum: "$exercises.duration" } 
        }
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 7,
      }
    ]);
    res.json(past);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
