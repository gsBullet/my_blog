const categoriesModel = require("../../models/categories.model");

const controller = {
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

        const data = await categoriesModel
            .find()
            .where({
                title: {$regex: key, $options:'i'}
            })
            .limit(limit)
            .skip(skip)
            .populate('creator')
            .exec();
        let count = await categoriesModel.count();
        return res.render('backend/category_management/all', {
            data,
            count,
            page,
            limit,
            key
        });
    },
    create: async (req, res) => {
        return res.render('backend/category_management/create_categories');
    },
    store: async (req, res) => {
        let data = {
            title: req.body.title,
            creator: req.session.user._id
        }
        let category = await categoriesModel.create(data)
        return res.redirect('/dashboard/category');
    },
    edit: async (req, res) => {
        let data = await categoriesModel.findOne().where({
            _id: req.params.id
        })
        return res.render('backend/category_management/edit', {
            data
        })
    },
    update: async (req, res) => {
        let data = {
            title: req.body.title,
            creator: req.session.user._id
        }
        let category = await categoriesModel.findOne().where({
            _id: req.params.id
        }).exec();
        category.title = data.title;
        category.category = data.creator;
        category.save();
        return res.redirect('/dashboard/category');
    },
    delete: async (req, res) => {

        await categoriesModel.deleteOne().where({
            _id: req.params.id
        }).exec();

        return res.redirect('/dashboard/category');
    },
    show: async (req, res) => {
        let data = await categoriesModel.findOne().populate('creator')
        return res.render('backend/category_management/show', {
            data
        })
    },
    update_status: async function(req,res){
        let {id,status} = req.body;
        console.log(id,status);
        let response = await categoriesModel.updateOne({_id:id},{status: status}).exec();
        console.log(response);
        return res.status(200).json(response);
    },
     
    export_info: async function(req,res){
        let exp_info = req.body.exp_info;

        let response = await categoriesModel.where("_id").in(exp_info).find().populate('creator').exec();
        return res.status(200).json(response);
    },
    delete_by_ids: async function(req,res){
        let exp_info = req.body.exp_info;

        let response = await categoriesModel.where("_id").in(exp_info).deleteMany().exec();
        return res.status(200).json(response);
    },
    

}


module.exports = controller;