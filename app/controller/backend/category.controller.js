const categoriesModel = require("../../models/categories.model");

const controller = {
    all: async (req, res) => {
        const data = await categoriesModel.find().populate('creator')
        return res.render('backend/category_management/all', {
            data
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

}


module.exports = controller;