const express = require('express')
const isAuthMiddleware = require('../../app/middleware/isAuth.middleware');
const {
    default: mongoose
} = require('mongoose');
const router = express.Router()
const User = mongoose.model('users', {
    name: String,
    email: String,
    password: Number,
    phone: String,
    role: String
});


router
    .get('/dashboard/user', async (req, res) => {
        const data = await User.find();
        return res.send(data);
        // return res.render('backend/blog_management/all')
    })
    .get('/dashboard/user/create', async (req, res) => {
        const data = new User({
            name: 'customer',
            email: 'customer@gmail.com',
            password: 114400,
            phone: '017854000',
            role: 'customer'
        });
        let status = " "
        await data.save()
            .then(() => (status = data))
            .catch((e) => (status = e.massage));
        res.send(status)
        // return res.render('backend/blog_management/create_blog')
    })
    .get('/dashboard/user/:id/edit', async(req, res) => {
        let id = req.params.id;

        // let name = req.query.name;
        // let email = req.query.email;
        // let password = req.query.password;
        const data = await User.where({
            _id: id
        }).findOne();
        data.password = 4521;
        data.name= 'Hello'
        data.save();
        return res.send(data);
        // return res.render('backend/blog_management/edit')
    })
    .get('/dashboard/user/:id/delete', async (req, res) => {
        let id = req.params.id;
        const data = await User.where({
            _id: id
        }).deleteOne();
        return res.send(data);
        // return res.render('backend/blog_management/show')
    })
    .get('/dashboard/user/:id', async (req, res) => {
        let id = req.params.id;
        const data = await User.where({
            _id: id
        }).findOne();
        return res.send(data);
        // return res.render('backend/blog_management/show')
    });




module.exports = () => router