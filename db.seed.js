const categorySeeder = require("./app/models/seeders/category.seeder");
const writterSeeder = require("./app/models/seeders/writter.seeder");


const seed = async()=>{
    await categorySeeder();
    await writterSeeder();

}
seed();