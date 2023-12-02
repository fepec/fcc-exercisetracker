const User = require('../models/user')
const Exercise = require('../models/exercise')

const asyncHandler = require('express-async-handler')

// Display list of all users
exports.user_list = asyncHandler(async (req, res, next) => {
    console.log("getting all users")
    const allUsers = await User.find().sort({ name: 1 }).exec()
    console.log("rendering")
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
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
});