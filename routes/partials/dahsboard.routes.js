const express = require('express')
const isAuthMiddleware = require('../../app/middleware/isAuth.middleware')
const router = express.Router()

router
    .get('/dashboard', (req, res) => {

        return res.render('backend/dashboard')
    });

module.exports = () => router