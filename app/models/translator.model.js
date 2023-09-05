
const {
    default: mongoose, Schema
} = require("mongoose");
const userModels = require("./user.models");


module.exports = mongoose.model('translators', mongoose.Schema({
    title: {
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