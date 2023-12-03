const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true },
})

// Virtual for bookinstance's URL
UserSchema.virtual("url").get( function() {
    return `/users/${this._id}`
})
// Other Virtuals, Instance Methods, Static Methods, and Query Helpers go here

// Export model
module.exports = mongoose.model("User", UserSchema)