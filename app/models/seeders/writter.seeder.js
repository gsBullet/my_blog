const {
    default: mongoose
} = require("mongoose");
const db_url = require("../../../config/db.config");
const writterModel = require("../writter.model");

let writters = [{
        name: "Manik",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Habib",
        creator: "64ef259dd8b1d04a8a31865b",

    },
    {
        name: "Jakir",
        creator: "64ef259dd8b1d04a8a31865b",

    }
    
]


module.exports = ()=> mongoose.connect(db_url)
    .then(async () => {
        console.log("seeder writter is connect");
        await writterModel.deleteMany({});
        let response = await writterModel.insertMany(writters);

        console.log("seeder writter is complete");
    });

