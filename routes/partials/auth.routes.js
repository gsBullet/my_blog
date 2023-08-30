const express = require('express');
const isAuthMiddleware = require('../../app/middleware/isAuth.middleware');
const userModels = require('../../app/models/user.models');
const router = express.Router()


router
    .post('/signup-submit', async(req, res) => {
        console.log(req.body);
        const {username, email, password, password_confirm} = req.body;
        let error = {};
        
        req.session.old = req.body;
        
        if(!username || !email || !password || !password_confirm){
            if(!username){
                error.username = "username is required"
            }
             if(!email){
                error.email = "email is required"
            }
            if(!password){
                error.password = "password is required"
            }
            if(!password_confirm){
                error.password_confirm = "password_confirm is required"
            }
            req.session.error = error;
            return res.redirect('/signup');
        }
        if(password != password_confirm){
            error.password = "password does not match";
            req.session.error = error;
            return res.redirect('/signup');
        }
        let user = await new userModels({
            username,
            email,
            password
        }).save();
        req.session.isAuth = true;
        let preUrl = req.session.prev_auth_url;
        if (preUrl) {
            delete req.session.prev_auth_url;
            return res.redirect(preUrl)
        }
        res.redirect('/');
    })
    .post('/login-submit', async(req, res) => {
        const {email, password} = req.body;
        let user = await userModels.where({
            email: email
        }).findOne();
        if(user){
            if(password == user.password){
                req.session.isAuth = true;
                req.session.user = user;
                let preUrl = req.session.prev_auth_url;
                if (preUrl) {
                    delete req.session.prev_auth_url;
                    return res.redirect(preUrl)
                }
                return res.redirect('/dashboard')
            }
        }else{
            return res.redirect('/login')
        }
        
        
    })
    .use(isAuthMiddleware())
    .get('/logout', (req, res) => {
        req.session.isAuth = false;
        return res.redirect('/')
    })

module.exports = () => router