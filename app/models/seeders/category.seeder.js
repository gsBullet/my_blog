const {
    default: mongoose
} = require("mongoose");
const db_url = require("../../../config/db.config");
const categoriesModel = require("../categories.model");

let categories = [{
        title: "Opinion",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "Sports",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "Business",
        creator: "64f5d087dd6cc063a71456cb",

    },
    {
        title: "Entertainment",
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
        // for (let index = 0; index < 50; index++) {
        //     await categoriesModel.create({
        //         title:('category')+(index+1),
        //         creator: '64f5d087dd6cc063a71456cb'
        //     })

            
        // }

        let checkCreator = await categoriesModel.findOne({}).populate('creator');
        // console.log(checkCreator);
        console.log("category seeder is complete");
    });