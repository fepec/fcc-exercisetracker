const User = require('../models/user')
const Exercise = require('../models/exercise')

const asyncHandler = require('express-async-handler')

// Display list of all users
exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().sort({ name: 1 }).exec()
    res.send(allUsers)
});


// Handle User create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
    // TODO Validate and sanitize
    // Create new User object
    const user = new User({
        name: req.body.username
    })
    // Save user
    const savedUser = await user.save();
    res.send(savedUser)

});


// Display detail page for a specific User
exports.user_detail = asyncHandler(async (req, res, next) => {
    console.log("get user")
    const [user, allExercisesByUser] = await Promise.all([
        User.findById(req.params.id).exec(),
        Exercise.find({ user: req.params.id }, "description duration date").exec()
    ])
    console.log("found user", user.name)
    console.log("found exercises", allExercisesByUser)
    // convert date to string in allExercisesByUser
    const exercisesWithFormattedDate = allExercisesByUser.map(exercise => {
        const exerciseObject = exercise.toObject();
        exerciseObject.date = exercise.date_formatted;
        return exerciseObject;
    });
    console.log("rendering")
    const foundUser = {
        username: user.name,
        count: allExercisesByUser.length,
        _id: user._id,
        log: exercisesWithFormattedDate
    }

    res.send(foundUser);
});