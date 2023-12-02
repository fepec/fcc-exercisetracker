const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
})

// Virtual for exercise's URL // Still unsure if I'll use it.
ExerciseSchema.virtual("url").get(function () {
    return `/exercise/${this._id}`
})

// Export model
module.exports = mongoose.model("Exercise", ExerciseSchema)