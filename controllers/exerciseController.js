const Exercise = require("../models/exercise");
const asyncHandler = require("express-async-handler");

// Handle exercise create on POST.
exports.exercise_create_post = asyncHandler(async (req, res, next) => {
    // res.send(`NOT IMPLEMENTED: Exercise detail ${req.params.id}`);
    // TODO Validate and sanitize
    // Create new Exercise object
    const exercise = new Exercise({
        user: req.params.id,
        description: req.body.description,
        duration: req.body.duration
    })
    if (req.body.date) {
        exercise.date = req.body.date
    }
    // Save user
    const savedExercise = await exercise.save();
    res.send(savedExercise)

});

// Display detail page for a specific exercise.
exports.exercise_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Exercise detail`);
  });
  