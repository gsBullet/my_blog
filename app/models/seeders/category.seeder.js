const {
    default: mongoose
} = require("mongoose");
const db_url = require("../../../config/db.config");
const categoriesModel = require("../categories.model");

let categories = [{
        title: "M",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        title: "b",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        title: "c",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        title: "d",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        title: "e",
        creator: "64ef259dd8b1d04a8a31865b",

    }
]


module.exports = ()=> mongoose.connect(db_url)
    .then(async () => {
        console.log("category seeder is connect");
        await categoriesModel.deleteMany({});
        let response = await categoriesModel.insertMany(categories);
        console.log('\n');

        let checkCreator = await categoriesModel.findOne({}).populate('creator');
        console.log(checkCreator);


        console.log('\n');
        console.log("category seeder is complete");
    });