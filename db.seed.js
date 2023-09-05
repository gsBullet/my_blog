const blogSeeder = require("./app/models/seeders/blog.seeder");
const categorySeeder = require("./app/models/seeders/category.seeder");
const translatorSeeder = require("./app/models/seeders/translator.seeder");
const writterSeeder = require("./app/models/seeders/writter.seeder");


const seed = async()=>{
    await categorySeeder();
    await writterSeeder();
    await translatorSeeder();
    await blogSeeder();

}
seed();