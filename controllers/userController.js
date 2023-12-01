const User = require('../models/user')
const asyncHandler = require('express-async-handler')


// Handle User create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User create POST");
});

// Display list of all authors
exports.user_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User list");
});

// Display detail page for a specific User
exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
});