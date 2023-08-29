const express = require('express');

const isAuthMiddleware = require('../../app/middleware/isAuth.middleware');
const router = express.Router()

router
    .get('/logout', (req, res) => {
        req.session.isAuth = false;
        // server.locals.checkIsAuth = false;
        return res.redirect('/')
    })

module.exports = () => router