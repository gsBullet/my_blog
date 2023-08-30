const {
    default: mongoose
} = require("mongoose");

module.exports = mongoose.model('users', {
    username: String,
    email: String,
    password: String,
});