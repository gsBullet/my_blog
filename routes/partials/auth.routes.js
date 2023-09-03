const express = require('express');
const isAuthMiddleware = require('../../app/middleware/isAuth.middleware');
const userModels = require('../../app/models/user.models');
const router = express.Router();
const bcrypt = require('bcrypt');


router
    .post('/signup-submit', async(req, res) => {
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
            password: await bcrypt.hash(password,10),
        }).save();
        // console.log(user);

        req.session.isAuth = true;
        req.session.user = user;
        let preUrl = req.session.prev_auth_url;
        if (preUrl) {
            delete req.session.prev_auth_url;
            return res.redirect(preUrl)
        }
        return res.redirect('/');
    })
    .post('/login-submit', async(req, res) => {
        const {email, password} = req.body;
       
        let error = {};
        req.session.old_body = req.body;

        if(!email || !password ){
            if(!email){
                error.email = "email is required"
            }
             if(!password){
                error.password = "password is required"
            }
            req.session.error = error;
            return res.redirect('/login')
        }
        let user = await userModels.where({
            email: email
        }).findOne();
        
        if(user){
            let passMatch = await bcrypt.compare(password, user.password)
            if(passMatch){
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
            error.password = "email or password does not match";
            req.session.error = error;
            return res.redirect('/login')
        }
        
    })
    .use(isAuthMiddleware())
    .get('/logout', (req, res) => {
        req.session.isAuth = false;
        return res.redirect('/')
    })

module.exports = () => router