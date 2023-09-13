const {
    default: mongoose
} = require("mongoose");
const db_url = require("../../../config/db.config");
const translatorModel = require("../translator.model");

let translator = [{
        name: "Omer",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Rakib",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Rashed",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Jabed",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Abu bakor",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Yousuf",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    
]


module.exports = ()=> mongoose.connect(db_url)
    .then(async () => {
        console.log("seeder translator is connect");
        await translatorModel.deleteMany({});
        let response = await translatorModel.insertMany(translator);
        console.log(response);
        console.log("seeder translator is complete");
    });

