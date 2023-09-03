
const {
    default: mongoose,
    Schema
} = require("mongoose");
const userModels = require("./user.models");


module.exports = mongoose.model('categories', mongoose.Schema({
    title: {
        type: String,
        default: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userModels
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
}))