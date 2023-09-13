const {
    body,
    validationResult
} = require("express-validator");
const blogModels = require("../../models/blog.models");
const categoriesModel = require("../../models/categories.model");
const translatorModel = require("../../models/translator.model");
const writterModel = require("../../models/writter.model");

const blogDataValidate = async (req) => {

    await body("title")
        .not()
        .isEmpty()
        .withMessage("title is required")
        .run(req);
    await body("short_description")
        .not()
        .isEmpty()
        .withMessage("short_description is required")
        .run(req);
    await body("description")
        .not()
        .isEmpty()
        .withMessage("description is required")
        .run(req);
    await body("category")
        .not()
        .isEmpty()
        .withMessage("categories is required")
        .run(req);
    await body("writter")
        .not()
        .isEmpty()
        .withMessage("writter is required")
        .run(req);
    await body("writting_date")
        .not()
        .isEmpty()
        .withMessage("writting_date is required")
        .run(req);
    await body("translator")
        .not()
        .isEmpty()
        .withMessage("translator is required")
        .run(req);
    // await body("thumb_image")
    //     .not()
    //     .isEmpty()
    //     .withMessage("thumb_image is required")
    //     .run(req);

    let result = validationResult(req);
    return {
        errors: result.array(),
        hasError: result.isEmpty() ? false : true,
    };
};

const controller = {
    folder_prefix: `blog_management`,
    router_prefix: `blog`,
    all: async (req, res) => {
        let limit = 10;
        let skip = 0;
        let page = 1;
        if (req.query.limit && req.query.limit > 0) {
            limit = parseInt(req.query.limit);

        }
        if (req.query.page && req.query.page > 0) {
            page = parseInt(req.query.page);
            skip = (page * limit) - limit;
        }
        let key = "";
        if (req.query.key) {
            key = req.query.key;

        }

        const data = await blogModels
            .find()
            .where({
                title: {
                    $regex: key,
                    $options: 'i'
                }
            })
            .limit(limit)
            .skip(skip)
            .populate('creator')
            .exec();
        let count = await blogModels.count();
        return res.render(`backend/${controller.folder_prefix}/all`, {
            data,
            count,
            page,
            limit,
            key
        });

    },
    create: async (req, res) => {
        let categories = await categoriesModel.find();
        let writters = await writterModel.find();
        let translators = await translatorModel.find();
        return res.render(`backend/${controller.folder_prefix}/create_blog`, {
            categories,
            translators,
            writters
        });
    },
    store: async (req, res) => {
        let validator = await blogDataValidate(req);
        if(validator.hasError){
            return res.status(422).json(validator)
        }
        let data = {
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description,
            categories: req.body["categories"],
            writter: req.body["writter"],
            writting_date: req.body.writting_date,
            translator: req.body["translator"],
            published: req.body.published,
            tags: req.body["tags"],
            status: true,
            view: 0,
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_keys: req.body.seo_keys,
            creator: req.session.user._id
        }

        let blog = await blogModels.create(data);
        return res.status(200).json([req.body, blog]);
    },

    edit: async (req, res) => {
        let data = await blogModels.findOne().where({
            _id: req.params.id
        })
        return res.render(`backend/${controller.folder_prefix}/edit`, {
            data
        })
    },
    update: async (req, res) => {
        let data = {
            title: req.body.title,
            creator: req.session.user._id
        }
        let category = await blogModels.findOne().where({
            _id: req.params.id
        }).exec();
        category.title = data.title;
        category.category = data.creator;
        category.save();
        return res.redirect(`/dashboard/${controller.router_prefix}`);
    },
    delete: async (req, res) => {

        await blogModels.deleteOne().where({
            _id: req.params.id
        }).exec();

        return res.redirect(`/dashboard/${controller.router_prefix}`);
    },
    show: async (req, res) => {
        let data = await blogModels.findOne().populate('creator');
        return res.render(`backend/${controller.folder_prefix}/show`, {
            data
        })
    },
    update_status: async function (req, res) {
        let {
            id,
            status
        } = req.body;
        console.log(id, status);
        let response = await blogModels.updateOne({
            _id: id
        }, {
            status: status
        }).exec();
        console.log(response);
        return res.status(200).json(response);
    },

    export_info: async function (req, res) {
        let exp_info = req.body.exp_info;

        let response = await blogModels.where("_id").in(exp_info).find().populate('creator').exec();
        return res.status(200).json(response);
    },
    delete_by_ids: async function (req, res) {
        let exp_info = req.body.exp_info;

        let response = await blogModels.where("_id").in(exp_info).deleteMany().exec();
        return res.status(200).json(response);
    },


}


module.exports = controller;