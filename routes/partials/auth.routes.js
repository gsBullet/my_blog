const express = require('express');
const isAuthMiddleware = require('../../app/middleware/isAuth.middleware');
const router = express.Router()


router
    .post('/login-submit', (req, res) => {
        req.session.isAuth = true;
        let preUrl = req.session.prev_auth_url;
        if (preUrl) {
            delete req.session.prev_auth_url;
            return res.redirect(preUrl)
        }
        res.redirect('/dashboard')
    })
    .use(isAuthMiddleware())
    .get('/logout', (req, res) => {
        req.session.isAuth = false;
        return res.redirect('/')
    })

module.exports = () => router