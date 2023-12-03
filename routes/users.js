const express = require('express');
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController")
const exercise_controller = require("../controllers/exerciseController")


// POST request for creating user
router.post("/", user_controller.user_create_post)

// GET request for list of all users
router.get("/", user_controller.user_list)

// POST request to create new exercise session
router.post("/:id/exercises", exercise_controller.exercise_create_post)

// GET request to list all user exercise sessions
router.get("/:id/logs", user_controller.user_detail)

module.exports = router;