const User = require('../models/user')
const Exercise = require('../models/exercise')

const asyncHandler = require('express-async-handler');
const exercise = require('../models/exercise');

// Display list of all users
exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}, "username _id").sort({ username: 1 }).exec()
    res.send(allUsers)
});


// Handle User create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
    // TODO Validate and sanitize
    // Create new User object
    const user = new User({
        username: req.body.username
    })
    // Save user
    const savedUser = await user.save();
    res.send(savedUser)

});


// Display detail page for a specific User
exports.user_detail = asyncHandler(async (req, res, next) => {
    // conditionally build Exercise.find Query
    let exerciseQuery = {
        user: req.params.id
    }

    // Initialize the date object if either 'from' or 'to' is present
    if (req.query.from || req.query.to) {
        exerciseQuery.date = {};
    }
    if (req.query.from) {
        exerciseQuery.date.$gte = req.query.from
    }
    if (req.query.to) {
        exerciseQuery.date.$lte = req.query.to
    }

    const [user, allExercisesByUser] = await Promise.all([
        User.findById(req.params.id, "username _id").exec(),
        Exercise
            .find(exerciseQuery,
                "description duration date")
            .sort({ date: 1 })
            .limit(req.query.limit)
            .exec()
    ])
    // convert date to string in allExercisesByUser
    const exercisesWithFormattedDate = allExercisesByUser.map(exercise => {
        const exerciseObject = exercise.toObject();
        exerciseObject.date = exercise.date_formatted;
        return exerciseObject;
    });
    console.log("rendering")
    const foundUser = {
        username: user.username,
        count: allExercisesByUser.length,
        _id: user._id,
        log: exercisesWithFormattedDate
    }

    res.send(foundUser);
});