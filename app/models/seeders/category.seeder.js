const {
    default: mongoose
} = require("mongoose");
const db_url = require("../../../config/db.config");
const categoriesModel = require("../categories.model");

let categories = [{
        title: "M",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "b",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "c",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "d",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "e",
        creator: "64f5d087dd6cc063a71456cb",

    }
]


module.exports = ()=> mongoose.connect(db_url)
    .then(async () => {
        console.log("category seeder is connect");
        await categoriesModel.deleteMany({});
        let response = await categoriesModel.insertMany(categories);
        console.log('\n');

        let checkCreator = await categoriesModel.findOne({}).populate('creator');
        // console.log(checkCreator);
        console.log("category seeder is complete");
    });