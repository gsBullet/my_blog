const {
    default: mongoose,
    Schema
} = require("mongoose");
const userModels = require("./user.models");
const writterModel = require("./writter.model");
const categoriesModel = require("./categories.model");
const translatorModel = require("./translator.model");

module.exports = mongoose.model('blogs', mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: categoriesModel
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userModels
    },
    writter: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: writterModel
    },
    writting_date:{
        type: Date,
        default: Date.now
    },
    translator: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: translatorModel
    },
    thumb_image: {
        type: String,
        // required: false
    },
    related_images: [String],
    published: {
        type: Boolean,
        required: false
    },
    tags:{
        type: Array,
        default: [],
        require: false,

    },
    status: {
        type: Boolean,
        required: false
    },

    view:{
        type: Number,
        default:0
    },
    seo_title: String,
    seo_description: String,
    seo_keys: String,


}, {
    timestamps: true
}));