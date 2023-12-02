const Exercise = require("../models/exercise");
const asyncHandler = require("express-async-handler");

// Handle exercise create on POST.
exports.exercise_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Exercise create POST");
});

// Display detail page for a specific exercise.
exports.exercise_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Exercise detail`);
  });
  