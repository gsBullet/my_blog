const {
    default: mongoose
} = require("mongoose");
const db_url = require("../../../config/db.config");
const blogModels = require("../blog.models");
const categoriesModel = require("../categories.model");
const userModels = require("../user.models");
const writterModel = require("../writter.model");
let blog_description = `
<p>
Deputy Attorney General Imran Ahmed Bhuiyan said today that he refrained from signing a statement, being prepared by the attorney general's office, protesting the recent letter from global figures to the prime minister over trial proceedings against Nobel Laureate Prof Muhammad Yunus.
</p>
<p>
"I support the statement issued by the Nobel Laureates and world leaders about the trial proceedings against Muhammad Yunus as I think that he is being harassed," the deputy attorney general said.
</p>
<p>
The attorney general's office is collecting signatures from the attorney general, additional attorney generals, deputy attorney generals and assistant attorney generals in order to issue a statement in protest against the statement, he said.
</p>

`;
const get_categories_ids = async () => {
    let category = await categoriesModel.find();
    return category.map(i=>i._id);
}
const get_writter_ids = async () => {
    let writter = await writterModel.findOne();
    return writter._id;
}
const get_user_ids = async () => {
    let user = await userModels.findOne();
    return user._id;
}
const blog_details= async ()=>{
    return {
        title:"Cases against Yunus: DAG refuses to sign AG office statement against world leaders' concern",
        short_description: "Deputy Attorney General Imran Ahmed Bhuiyan said today that he refrained from signing a statement, being prepared by the attorney general's office, protesting the recent letter from global figures to the",
        description: blog_description,
        categories: await get_categories_ids(),
        creator:await get_user_ids(),
        writter:await get_writter_ids(),
        // translator: "",
        writting_date: "2023-01-23",
        thumb_images: "img/1.jpg",
        published: true,
        seo_title: "Cases against Yunus: DAG refuses to sign AG office statement against world leaders' concern",
        seo_description: "Deputy Attorney General Imran Ahmed Bhuiyan said today that he refrained from signing a statement, being prepared by the attorney general's office, protesting the recent letter from global figures to the",
        seo_keys: "Yunus, Dr-Yunus, Dr-yunus-judgement "


    }

}




module.exports = () => mongoose.connect(db_url)
    .then(async () => {
        console.log("seeder blog is connect");
        await blogModels.deleteMany({});
        let response = await blogModels.create(await blog_details());

        console.log("seeder blog is complete");
    });