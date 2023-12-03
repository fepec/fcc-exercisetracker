const Exercise = require("../models/exercise");
const User = require("../models/user")
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
    const [savedExercise, user] = await Promise.all([
        exercise.save(),
        User.findById(req.params.id).exec()
    ]);

    res.send({
        username: user.username,
        count: 1,
        _id: user._id,
        log: [{
            description: savedExercise.description,
            duration: savedExercise.duration,
            date: savedExercise.date_formatted,
        }]
    })

});

// Display detail page for a specific exercise.
exports.exercise_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Exercise detail`);
});
