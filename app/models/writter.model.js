const {
    Timestamp
} = require("mongodb");
const {
    default: mongoose, Schema
} = require("mongoose");
const userModels = require("./user.models");


module.exports = mongoose.model('writters', mongoose.Schema({
    name: {
        type: String,
        default: true
    },
    image:String,
    description:String,
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